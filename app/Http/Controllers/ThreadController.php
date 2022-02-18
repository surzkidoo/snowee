<?php

namespace App\Http\Controllers;

use App\post;
use App\thread;
use App\followpost;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ThreadController extends Controller
{
    public function threadPost(Request $request,$id){
      
      $sort=$request->input('sort')==null? "old" : $request->input('sort');
      if($sort=="old"){

      $thread=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote','reply')->where('thread_id','=',$id)->where('reply_to_id','=',0)->paginate(5);
      return response()->json($thread, 200);

      }
      else if($sort=="new"){

      $thread=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote','reply')->where('thread_id','=',$id)->where('reply_to_id','=',0)->orderBy('created_at','DESC')->paginate(5);
      return response()->json($thread, 200);

      }
      else if($sort=="upvote"){

        $thread=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote','reply')->where('thread_id','=',$id)->where('reply_to_id','=',0)->orderBy('upvote_count','DESC')->paginate(5);
        return response()->json($thread, 200);

      }

    
      }
  
      public function store(Request $request){

        $validator = Validator::make($request->all(), [
            "title" => "required|string|max:255",
            "content" =>"required"
        ]);
     
      $thread = new thread();
      $thread->title=$request->title;
      $thread->content=$request->content;
      $thread->section_id=$request->section_id;
      $thread->slug=Str::slug($request->title);
      $thread->user_id=auth()->user()->id;
      $thread->save();

      
      
        return response()->json($thread, 200);
      }
  
      /**
       * Display the specified resource.
       *
       * @param  int  $id
       * @return \Illuminate\Http\Response
       */
      public function show($slug)
      {
        $thread= thread::where('slug','=',$slug)->first();
        $follow= followpost::where('user_id','=',auth()->user()->id)->where('thread_id','=',$thread->id)->get();
        if($follow->count()==0){
          $follow=0;
        }else{
          $follow=1;
        }
        return view('post',["thread"=>$thread,'follow'=>$follow]);
      }
  
      
    //1 is the result of following- 0 is for unfollowing
    public function followPost(Request $request,$threadid){
      $checkfollow = followpost::where('thread_id','=',$threadid)->where('user_id','=',auth()->user()->id)->get();
      if($checkfollow->count()==0){
          $follow = new followPost();
          $follow->user_id=auth()->user()->id;
          $follow->thread_id=$threadid;
          $follow->save();
          return response()->json(1, 200);
      }
      $valid = followpost::where('thread_id','=',$threadid)->where('user_id','=',auth()->user()->id)->delete();
      if(!$valid){
          return response()->json(["error"=>"unfollow failed"], 404);
      }
      return response()->json(0, 200);
  }

   
      public function update(Request $request, $id)
      {
        
        $validator = Validator::make($request->all(), [
          "title" => "required|string|max:255|min:3",
          "content" =>"required"
      ]);
    
        $thread = thread::where('id','=',$id)->where('user_id','=',auth()->user()->id)->first();
        
        if(!$thread){
            return response()->json('Thread not found or unAuthorized to edit', 400);
        }
        $checkduplicate = thread::where('id','!=',$id)->where('slug','=',$thread->slug)->where('user_id','=',auth()->user()->id)->first();
        $checkduplicate? $thread->slug=$thread->slug.Str::random(4):$thread->$request->title;
        $thread->content=$request->content;
        $thread->save();
        return response()->json($thread, 200);
      
      }
    
      public function destroy($id){
        $thread = thread::where('id','=',$id)->where('user_id','=',auth()->user()->id)->first();
        if(!$thread){
          return response()->json('Thread not found or unAuthorized to edit', 400);
      }
      post::where('id','=',$id)->delete();
      $result=$thread->delete();
        return response()->json($result, 200);
      }
}
