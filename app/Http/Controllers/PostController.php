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
        return response()->json($post, 200);
      }
}
