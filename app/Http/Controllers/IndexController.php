<?php

namespace App\Http\Controllers;

use App\post;
use App\thread;
use App\upvote;
use App\downvote;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request){
        return view('index');
    }

    public function popular(Request $request){
        $thread=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->simplePaginate(5);
        return response()->json($thread, 200);
    }

    public function upvote(Request $request){
        if($request->thread_id){
            $result=upvote::where("user_id","=",auth()->user()->id)->where("thread_id","=",$request->thread_id)->get();
            
            if($result->count()==0){
                $upvote= new upvote();
                $upvote->user_id=auth()->user()->id;
                $upvote->thread_id=$request->thread_id;
                $upvote->save();
                $count=upvote::where("thread_id","=",$request->thread_id)->get();
                $count=count($count);
                return response()->json($count, 200);
            }else{
                $result=upvote::where("user_id","=",auth()->user()->id)->where("thread_id","=",$request->thread_id)->delete();
                $count=upvote::where("thread_id","=",$request->thread_id)->get();
                $count=count($count);
                return response()->json($count, 200);
            }
        }
        else if($request->post_id){
            $result=upvote::where("user_id","=",auth()->user()->id)->where("post_id","=",$request->post_id)->get();

            if($result->count()==0){
                $upvote= new upvote();
                $upvote->user_id=auth()->user()->id;
                $upvote->post_id=$request->post_id;
                $upvote->save();
                $count=upvote::where("post_id","=",$request->post_id)->get();
                $count=count($count);
                return response()->json($count, 200);
            }
            else{
                    $result=upvote::where("user_id","=",auth()->user()->id)->where("post_id","=",$request->post_id)->delete();
                    $count=upvote::where("post_id","=",$request->post_id)->get();
                    $count=count($count);
                    return response()->json($count, 200);
              }
        }

            else{
                return response()->json(["error"=>"Unknown Command"], 403);

            }


    }

    public function downvote(Request $request){
        if($request->thread_id){
            $result=downvote::where("user_id","=",auth()->user()->id)->where("thread_id","=",$request->thread_id)->get();
            
            if($result->count()==0){
                $downvote= new downvote();
                $downvote->user_id=auth()->user()->id;
                $downvote->thread_id=$request->thread_id;
                $downvote->save();
                $count=downvote::where("thread_id","=",$request->thread_id)->get();
                $count=count($count);
                return response()->json($count, 200);
            }else{
                $result=downvote::where("user_id","=",auth()->user()->id)->where("thread_id","=",$request->thread_id)->delete();
                $count=downvote::where("thread_id","=",$request->thread_id)->get();
                $count=count($count);
                return response()->json($count, 200);
            }
        }
        else if($request->post_id){
            $result=downvote::where("user_id","=",auth()->user()->id)->where("post_id","=",$request->post_id)->get();
            if($result->count()==0){
                $downvote= new downvote();
                $downvote->user_id=auth()->user()->id;
                $downvote->post_id=$request->post_id;
                $downvote->save();
                $count=downvote::where("post_id","=",$request->post_id)->get();
                $count=count($count);
                return response()->json($count, 200);
            }
            else{
                    $result=downvote::where("user_id","=",auth()->user()->id)->where("post_id","=",$request->post_id)->delete();
                    $count=downvote::where("post_id","=",$request->post_id)->get();
                    $count=count($count);
                    return response()->json($count, 200);
              }
        }
            else{
                return response()->json(["error"=>"Unknown Command"], 403);
            }
        }

        



}
