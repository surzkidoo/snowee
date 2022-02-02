<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/signup',"AuthController@registerPage")->name('registerpage');
Route::post('/signup',"AuthController@register")->name('register');


Route::get('/login',"AuthController@loginPage")->name('loginpage');
Route::post('/login',"AuthController@login")->name('login');


Route::get('/',"IndexController@index")->name('index');
Route::get('/popular',"IndexController@popular")->name('getThread');

Route::get('/section',"SectionController@index")->name('section');
Route::get('/section-data',"SectionController@indexData")->name('section-data');

Route::get('/section/{name}',"SectionController@singleShow")->name('single');
Route::get('/section-data/{name}',"SectionController@single")->name('single-data');

Route::get('/section/{name}/updated',"SectionController@updatedTopics")->name('section-updated');
Route::get('/section/{name}/viewed',"SectionController@mostViewedTopics")->name('section-viewed');
Route::get('/section/{name}/new',"SectionController@newTopics")->name('section-new');


Route::post('/post',"PostController@store")->name('newpost');
Route::put('/post/{id}',"PostController@update")->name('updatepost');
Route::delete('/post/{id}',"PostController@delte")->name('deletepost');
Route::get('/post/{threadID}',"PostController@index")->name('getpost');

Route::post('/upvote',"IndexController@upvote")->name('upvote');
Route::post('/downvote',"IndexController@downvote")->name('downvote');

Route::get('/user/feed',"UserController@feed")->name('feed');
Route::get('/user/{id}/',"UserController@profile")->name('profile');
Route::get('/user/{id}/topics',"UserController@userTopics")->name('userpost');
Route::get('/user/{id}/posts',"UserController@userPosts")->name('usertopics');
Route::get('/user/{id}/upvote',"UserController@userUpvoted")->name('usertopics');


Route::get('/user/{username}/following',"UserController@following")->name('userFollower');
Route::get('/user/{username}/getfollowing',"UserController@getFollowing")->name('getFollowering');
Route::post('/user/{username}/setfollowing',"UserController@setFollowing")->name('userFollower');
Route::get('/user/{username}/block',"UserController@setBlock")->name('setblock');


Route::get('/user/{username}/follower',"UserController@follower")->name('setFollower');
Route::get('/user/{username}/getfollower',"UserController@getFollower")->name('getFollower');
Route::post('/setfollow',"UserController@setFollow")->name('setFollower');

Route::get('/thread/{id}/posts',"ThreadController@threadPost")->name('pthread');
Route::get('/thread/{id}/follow',"ThreadController@followPost")->name('flthread');
Route::post('/thread',"ThreadController@store")->name('thread');
Route::get('/{slug}',"ThreadController@show")->name('thread');
