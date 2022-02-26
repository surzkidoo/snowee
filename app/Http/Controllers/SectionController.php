<?php

namespace App\Http\Controllers;

use App\post;
use App\thread;
use App\section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index(Request $request){
        
        
        return view('section');
    }

    public function indexData(Request $request){
        
        $section=section::all();
        return response()->json($section, 200);
    }

    public function single(Request $request,$name){

        $section=section::with('threads.user')->where("name","=",$name)->get();
        return response()->json($section, 200);
    }

    public function singleShow(Request $request,$name){

        $section=section::where("name","=",$name)->first();
       
        return view('single-section',["section"=>$section]);

    }

    public function store(Request $request,$name){

        $section=section::where("name","=",$name)->first();
       
        return view('single-section',["section"=>$section]);

    }

    
    public function mostViewedTopics(Request $request,$id){

        $section=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where("section_id","=",$id)->orderBy('views','DESC')->paginate(5);
       
        return response()->json($section, 200);

    }


    public function newTopics(Request $request,$id){
        $section=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where("section_id","=",$id)->orderBy('created_at','DESC')->paginate(5);
        return response()->json($section, 200);
    }

    public function updatedTopics(Request $request,$id){

        $section=thread::with('user:username,id,avatar,verified','section:id,name','image')->withCount('posts','upvote','downvote')->where("section_id","=",$id)->whereColumn('updated_at', '!=', 'created_at')->orderBy('updated_at','DESC')->paginate(5);
        return response()->json($section, 200);

    }

}
