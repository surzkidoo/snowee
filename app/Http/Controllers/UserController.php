<?php

namespace App\Http\Controllers;

use App\post;
use App\User;
use App\follow;
use App\thread;
use App\upvote;
use App\section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
 {   
    //  public function __construct(){
    //     $this->middleware(['auth'])->only('following');
    // }
    public function Feed(Request $request){
        if(auth()->check()){
            $container=[];
            $user=User::with('feed')->where('id','=',auth()->user()->id)->first();
            $result=$user->feed()->orderBy('created_at','DESC')->paginate(10);
            foreach($result->items() as $rs){
            $thread=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where('id','=',$rs->id)->first();
             array_push($container,$thread);
            }
            return response()->json(["url"=>$result->url(1),"data"=>$container], 200);
        }
        return response()->json(["error"=>"UnAuthorized user"], 403);
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
        $follow= null;
        $followb= null;
        $blocked=null;
        $user=User::where("username",'=',$id)->first();
        if (!$user){
            return abort(404);
        }
        if(auth()->check()){

        $follow= follow::where('follower_id','=',auth()->user()->id)->where('follow_id','=',$user->id)->get();
        $followb= follow::where('follower_id','=',$user->id)->where('follow_id','=',auth()->user()->id)->first();
        
        if($followb){
             $blocked= $followb->blocked;
        } else{
            $blocked=-1;
        }
        if($follow->count()==0){
          $follow=0;
        }else{
            $follow=1;
        }
    }
        return view('profile',['user'=>$user,'follow'=>$follow,'blocked'=>$blocked]);
    }

    public function userTopics(Request $request,$id){
        $thread=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where('user_id','=',$id)->paginate(5);
        return response()->json($thread, 200);
    }

    public function userPosts(Request $request,$id){
        $thread=post::with('user:username,id,avatar,verified','image')->withCount('upvote','downvote')->where('user_id','=',$id)->paginate(5);
        return response()->json($thread, 200);
    }

    public function userUpvoted(Request $request,$id){
        // $thread=User::with("upvote")->where('id','=',$id)->get();
        $container=[];
        $upvote=upvote::where('user_id','=',$id)->where('thread_id','!=',null)->paginate(5);
        foreach($upvote->items() as $up){
          
               $single= thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where('id','=',$up->thread_id)->first();
               $single && array_push($container,$single);

            
        }
        return response()->json(["url"=>$upvote->url(1),"data"=>$container], 200);
    }
    public function setBlock(Request $request,$id){
        $user=User::where("id",'=',$id)->first();
        $followb= follow::where('follower_id','=',$user->id)->where('follow_id','=',auth()->user()->id)->first();
        if($followb){
            if($followb->blocked==1){
                $followb->blocked=0;
                $followb->save();
                return response()->json(0, 200);
            }
            $followb->blocked=1;
            $followb->save();
            return response()->json(1, 200);
       } else{
           $blocked=-1;
       }
        return response()->json($blocked, 404);
    }


    public function updateProfile(Request $request){
        $validator = Validator::make($request->all(), [
            "bio" =>"required",
            'avatar'  => 'mimes:jpg,png,jpeg'
        ]);
        if(auth()->check()){
        $user = auth()->user();
        $user->bio = $request->bio;
        if($request->hasFile('avatar')){
            $file      = $request->file('avatar');
            $path = $file->store('/images/user','public');
            $temp=$user->avatar;
            if($temp!=="avatar.png"){
                File::delete($temp);
            }
            $user->avatar='storage/'.$path;
            
        }
        $user->save();
        return response()->json(["message"=>"update success"], 200);
        }
        return response()->json(['message'=>'Unuthorized user'], 401, $headers);
    }

}
