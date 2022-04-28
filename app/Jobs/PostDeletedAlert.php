<?php

namespace App\Jobs;

use App\notification;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class PostDeletedAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user;
    protected $post;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user,$post)
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
        $noti->message ="Just Delete A Post In ".$this->post->thread->section->name;
        $noti->user_id = $post->user_id;
        $noti->url =$this->thread->slug;
        $noti->event_user_id = $this->thread->user_id;
        $noti->notification_type_id=3; //Delete Post
        $noti->save();
    }
}
