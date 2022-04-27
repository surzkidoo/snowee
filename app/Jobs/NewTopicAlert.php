<?php

namespace App\Jobs;

use App\User;
use App\thread;
use App\notification;
use Illuminate\Bus\Queueable;
use App\Events\NewNotification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class NewTopicAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $thread;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user,thread $thread)
    {
        $this->user = $user;
        $this->thread = $thread;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        foreach ($this->user->follower as $follower) {

              $noti= new notification();
              $noti->message = $this->user->username."Just Created A New Topic ".$this->thread->section->name;
              $noti->user_id = $follower->id;
              $noti->url =$this->thread->slug;
              $noti->event_user_id = $this->thread->user_id;
              $noti->notification_type_id=2; //New Topic
              $noti->save();
              event(new NewNotification($noti))->toOthers();
            }
    }
}
