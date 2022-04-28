<?php

namespace App\Jobs;

use App\thread;
use App\notification;
use Illuminate\Bus\Queueable;
use App\Events\NewNotification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class NewPostAlert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $thread;
    protected $user_id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($thread,$user_id)
    {
        $this->thread= $thread;
        $this->user_id = $user_id;
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
            $noti->message = $follower->username. "New comment posted in ".$this->thread->title;
            $noti->user_id= $follower->id;
            $noti->url= $this->thread->slug;
            $noti->event_user_id=$this->user_id;
            $noti->notification_type_id=1; //New comment
            $noti->save();
            
            event(new NewNotification($noti));
  
      }

      
    }

}