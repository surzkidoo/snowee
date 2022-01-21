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

Route::post('/post',"PostController@store")->name('newpost');
Route::get('/post/{threadID}',"PostController@index")->name('getpost');

Route::get('/{slug}',"ThreadController@show")->name('thread');
Route::post('/thread',"ThreadController@store")->name('thread');


