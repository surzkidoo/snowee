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

class UpvoteAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user;
    protected $thread;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user,thread $thread)
    {
        $this->thread = $thread;
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $noti= new notification();
        $noti->message = "Just Upvote Your Topic ".$this->thread->title;
        $noti->user_id= $this->thread->user_id;
        $noti->url= "user/".$this->user->username;
        $noti->event_user_id=$this->user->id;
        $noti->notification_type_id=7; //M
        $noti->save();
        event(new NewNotification($noti));
    }
}
