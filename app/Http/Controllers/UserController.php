<?php

namespace App\Http\Controllers;

use App\post;
use App\User;
use App\follow;
use App\thread;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function feed(Request $request){
        
    }

    public function follower(Request $request,$username){
        $user=User::where("username",'=',$username)->first();
        return view('followers',['user'=>$user]);
    }

    public function getFollower(Request $request,$username){
        $user=User::with('follower')->where("username",'=',$username)->first();
       
        $multiplied = $user->follower->map(function ($item, $key) {
            $user=follow::where("follow_id",'=',$item->id)->where("follower_id",'=',auth()->user()->id)->first();
            if($user){
                return ["user"=>$item,"following"=>true];
            }
            return ["user"=>$item,"following"=>false];
        });
        if(!$user){
            return response()->json(["error"=>"Unknown request"],402);
        }
        
        return response()->json($multiplied,200);
    }


    public function setFollow(Request $request){
       $result=follow::where("follow_id",'=',$request->follow_id)->where("follower_id",'=',auth()->user()->id)->first();
        if(!$result){
            $follow = new follow();
            $follow->follow_id=$request->follow_id;
            $follow->follower_id=auth()->user()->id;
            $follow->save();
            $follow=1;
        }
        else{
            $follow=follow::where("follow_id",'=',$request->follow_id)->where("follower_id",'=',auth()->user()->id)->delete();
            $follow=0;
        }
        return response()->json($follow,200);
    }

   

    public function following(Request $request,$username){
        $user=User::where("username",'=',$username)->first();
        return view('following',['user'=>$user]);

    }

    public function getFollowing(Request $request,$username){
        $user=User::with('following')->where("username",'=',$username)->first();
       
        $multiplied = $user->following->map(function ($item, $key) {
            $user=follow::where("follow_id",'=',$item->id)->where("follower_id",'=',auth()->user()->id)->first();
            if($user){
                return ["user"=>$item,"following"=>true];
            }
            return ["user"=>$item,"following"=>false];
        });
        if(!$user){
            return response()->json(["error"=>"Unknown request"],402);
        }
        
        return response()->json($multiplied,200);
    } 
    
    public function profile(Request $request,$id){
        $user=User::where("username",'=',$id)->first();
        return view('profile',['user'=>$user]);
    }

    public function userTopics(Request $request,$id){
        $thread=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where('user_id','=',$id)->get();
        return response()->json($thread, 200);
    }

    public function userPosts(Request $request,$id){
        $thread=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote')->where('user_id','=',$id)->get();
        return response()->json($thread, 200);
    }
}
