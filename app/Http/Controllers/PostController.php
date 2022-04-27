<?php

namespace App\Http\Controllers;

use App\post;
use App\image;
use App\thread;
use App\notification;
use App\Jobs\NewPostAlert;
use App\Jobs\UserTopicAlert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{


    public function index(Request $request,$threadID){
        $data=post::where('thread_id','=',$threadID);        
        return response()->json($data, 200);
      }


    public function store(Request $request){

          $validator = Validator::make($request->all(), [
              "content" =>"required",
              "thread_id"=>"required",
              'files.*'  => 'mimes:jpg,png'
          ]);
        
         
        $post = new post();
        $post->content=$request->content;
        $post->thread_id=$request->thread_id;
        $post->user_id=auth()->user()->id;
        $post->reply_to_id=$request->reply_to_id;
        $post->save();
        $post->touch();

        // //getting user followers
        // $npost = Post::where('id',$post->id)->first();
        // $followers = auth()->user()->followers();
        // foreach ($followers as $follower) {
        //   if($post->reply_to_id!==0 && $follower->user_id === $npost->user_id){

        //     $noti= new Notification();
        //     $noti->message = auth()->user()->username. " Replied Your comment posted in ".$post->title;
        //     $noti->user->$follower->id;
        //     $noti->event_user_id->$post->user_id;
        //     $noti->notification_type_id=1; //New comment
        //     $noti->save();
        //   }
        //   $noti= new Notification();
        //   $noti->message = $follower->username. " New comment posted in ".$post->title;
        //   $noti->user->$follower->id;
        //   $noti->event_user_id->$post->user_id;
        //   $noti->notification_type_id=1; //New comment
        //   $noti->save();
        // }

        $thread= thread::where('id',$post->thread_id)->first();
        
        $postNotification = new NewPostAlert($thread,$post->user_id);
        $this->dispatch($postNotification);
        
        $userNotification = new UserTopicAlert($thread,$post->user_id);
        $this->dispatch($userNotification);
        
        
        if($request->TotalFiles > 0 && $post)
        {
               
           for ($x = 0; $x < $request->TotalFiles; $x++) 
           {
               if ($request->hasFile('files'.$x)) 
                {
                    $file      = $request->file('files'.$x);
                    $path = $file->store('/images/thread','public');
                    $image = new image();
                    $image->post_id=$post->id;
                    $image->url = 'storage/'.$path;
                    $image->save();
                    
                }
           }
          }
        $postreply=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote','reply')->where('id','=',$post->id)->first();
        
        $replycount=count(post::where('reply_to_id','=',$request->reply_to_id)->get());
        $generalcount=count(thread::where('id','=',$request->thread_id)->get());
          return response()->json(["data"=>$postreply,"replycount"=>$replycount,"generalcount"=>$generalcount], 200);

      }


    public function update(Request $request,$id){
      $validator = Validator::make($request->all(), [
        "content" =>"required"
    ]);

    $post = post::where('id','=',$id)->where('user_id','=',auth()->user()->id)->first();

    if(!$post){
        return response()->json('post not found or unAuthorized to edit', 400);
    }

    $post->content=$request->content;
    $result=$post->save();
    return response()->json($result, 200);

    }

    public function delete(Request $request,$id){
   
    $post = post::where('id','=',$id)->where('user_id','=',auth()->user()->id)->delete();
    if($post){
    $deleteSub=post::where('reply_to_id','=',$id)->delete();
    return response()->json(($post), 200);
    }
    
        return response()->json('post not found or unauthorized to delete', 400);
    
    }


    public function replyPost($id){

      $postreply=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote')->where('reply_to_id','=',$id)->get();
      return response()->json($postreply, 200);
    }

    public function addreplyPost($id){

    
          $validator = Validator::make($request->all(), [
            "content" =>"required",
            "thread_id"=>"required"
        ]);
    
      $post = new post();
      $post->content=$request->content;
      $post->thread_id=$request->thread_id;
      $post->user_id=auth()->user()->id;
      $post->reply_to_id=$request->reply_to;
      $post->save();
      $post->touch();
      
        return response()->json($post, 200);
    }

    
}
