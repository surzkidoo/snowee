<?php

namespace App\Jobs;

use App\User;
use App\post;
use App\notification;
use Illuminate\Bus\Queueable;
use App\Events\NewNotification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class UpvoteCommentAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user;
    protected $post;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user,post $post)
    {
        $this->post = $post;
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
        $noti->message = "Just Upvote Your Comment ".$this->post->title;
        $noti->user_id= $this->post->user_id;
        $noti->url= "user/".$this->user->username;
        $noti->event_user_id=$this->user->id;
        $noti->notification_type_id=15; //M
        $noti->save();
        event(new NewNotification($noti));
    }
}
