<?php

namespace App;

use App\tag;
use App\User;
use App\image;
use App\thread;
use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    protected $touches = ['thread'];

    public function user(){        
        return $this->belongsTo(User::class);
    }

    public function image(){        
        return $this->hasMany(image::class);
    }

    public function thread(){        
        return $this->belongsTo(thread::class);
    }

    public function tag(){        
        return $this->hasMany(tag::class);
    }
    public function upvote(){        
        return $this->hasManyThrough('App\User', 'App\upvote', 'post_id', 'id','id','user_id');
    }
    public function downvote(){        
        return $this->hasManyThrough('App\User', 'App\downvote', 'post_id', 'id','id','user_id');
    }
    
}
