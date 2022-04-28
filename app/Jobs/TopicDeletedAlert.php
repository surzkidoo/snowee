<?php

namespace App\Jobs;

use App\notification;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class TopicDeletedAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user_id;
    protected $thread;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_id ,$thread)
    {
        $this->user_id = $user_id;
        $this->thread = $thread;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->thread->followers as $follower) {
        $noti= new notification();
        $noti->message ="Just Delete A Topic".$this->thread->title;
        $noti->user_id = $follower->id;
        $noti->url =$this->thread->slug;
        $noti->event_user_id = $this->user_id;
        $noti->notification_type_id=9; //Delete Topic
        $noti->save();
        }
    }
}