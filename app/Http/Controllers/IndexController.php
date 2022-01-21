<?php

namespace App\Http\Controllers;

use App\thread;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request){

        
        return view('index');
    }

    public function popular(Request $request){
        $thread=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->get();
        return response()->json($thread, 200);
    }
}
