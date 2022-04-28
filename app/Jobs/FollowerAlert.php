<?php

namespace App\Jobs;

use App\follow;
use App\notification;
use Illuminate\Bus\Queueable;
use App\Events\NewNotification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class FollowerAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user;
    protected $follow;    
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user,follow $follow)
    {
        $this->user = $user;
        $this->follow = $follow;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $noti= new notification();
        $noti->message = "Is Now Following You";
        $noti->user_id= $this->follow->follow_id;
        $noti->url= "user/".$this->user;
        $noti->event_user_id=$this->follow->follower_id;
        $noti->notification_type_id=6; //Following notification
        $noti->save();
        event(new NewNotification($noti));

    }
}
