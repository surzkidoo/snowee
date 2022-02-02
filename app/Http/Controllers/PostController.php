<?php

namespace App\Http\Controllers;

use App\post;
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
            "thread_id"=>"required"
        ]);
     
      $post = new post();
      $post->content=$request->content;
      $post->thread_id=$request->thread_id;
      $post->user_id=auth()->user()->id;
      $post->save();
      $post->touch();
      
        return response()->json($post, 200);
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

    $post = post::where('id','=',$id)->where('user_id','=',auth()->user()->id)->first();

    if(!$post){
        return response()->json('post not found or unauthorized to delete', 400);
    }
    $result=$post->delete();

    return response()->json($result, 200);

    }
}
