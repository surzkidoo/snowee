<?php

namespace App;

use App\post;
use App\follow;
use App\thread;
use App\followpost;
use App\notification;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts(){

            return $this->hasMany(post::class);
    }
    public function threads(){

        return $this->hasMany(thread::class);
    }

    public function notifications(){
        return $this->hasMany(notification::class);
    }

    public function following(){
        return $this->hasManyThrough('App\User', 'App\follow', 'follower_id',"id","id","follow_id");
    }

    public function follower(){
            return $this->hasManyThrough('App\User', 'App\follow', 'follow_id', 'id','id',"follower_id");
    }

    public function followpost(){
        return $this->hasManyThrough('App\thread', 'App\followpost', 'user_id', 'id');
    }


}
