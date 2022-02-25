<?php

namespace App\Http\Controllers;

use App\post;
use App\image;
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
        $checkduplicate = thread::where('slug','=',Str::slug($request->title))->first();
        

        $thread = new thread();
        $thread->title=$request->title;
        $thread->content=$request->content;
        $thread->section_id=$request->section_id;
        $checkduplicate? $thread->slug=Str::slug($request->title).'-'.rand(1000,9999): $thread->slug=Str::slug($request->title);
        $thread->user_id=auth()->user()->id;
        $thread->save();

        if($request->TotalFiles > 0 && $thread)
        {
               
           for ($x = 0; $x < $request->TotalFiles; $x++) 
           {
               if ($request->hasFile('files'.$x)) 
                {
                    $file      = $request->file('files'.$x);
                    $path = $file->store('/images/thread','public');
                    $image = new image();
                    $image->thread_id=$thread->id;
                    $image->url = 'storage/'.$path;
                    $image->save();
                    
                }
           }
          }
          $thread=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where('id','=',$thread->id)->first();

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
        $follow=null;
        if(auth()->check()){
        $follow= followpost::where('user_id','=',auth()->user()->id)->where('thread_id','=',$thread->id)->get();
        if($follow->count()==0){
          $follow=0;
        }else{
          $follow=1;
        }
      }
        $thread->views++;
        $thread->save();
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
       
        $thread->title= $request->title;
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
