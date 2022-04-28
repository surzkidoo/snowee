<?php

namespace App\Jobs;

use App\post;
use App\User;
use App\thread;
use App\notification;
use Illuminate\Bus\Queueable;
use App\Events\NewNotification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class PostFollowerAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user;
    protected $post;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user,thread $post)
    {
        $this->user = $user;
        $this->post = $post;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        
        $noti= new notification();
        $noti->message = "Is Following Your Post".$this->post->title;
        $noti->user_id= $this->post->user_id;
        $noti->url= "user/".$this->user->username;
        $noti->event_user_id=$this->user->id;
        $noti->notification_type_id=4; //Following Post
        $noti->save();
        event(new NewNotification($noti));

    }
}
