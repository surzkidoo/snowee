<?php

namespace App\Http\Controllers;

use App\post;
use App\thread;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ThreadController extends Controller
{
    public function threadPost(Request $request,$id){
      $thread=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote')->where('thread_id','=',$id)->get();
      return response()->json($thread, 200);
      }
  
  
      public function store(Request $request){

        $validator = Validator::make($request->all(), [
            "title" => "required|string|max:255|min:3",
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
        return view('post',["thread"=>$thread]);
      }
  
      
      public function edit($id)
      {
          //
      }
  
      /**
       * Update the specified resource in storage.
       *
       * @param  \Illuminate\Http\Request  $request
       * @param  int  $id
       * @return \Illuminate\Http\Response
       */
      public function update(Request $request, $id)
      {
          //
      }
  
      /**
       * Remove the specified resource from storage.
       *
       * @param  int  $id
       * @return \Illuminate\Http\Response
       */
      public function destroy($id)
      {
          thread::find($id)->delete();
          return redirect()->back();
      }
}
