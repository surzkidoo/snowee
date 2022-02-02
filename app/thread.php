<?php

namespace App;

use App\post;
use App\User;
use App\image;
use App\upvote;
use App\section;
use App\downvote;
use Illuminate\Database\Eloquent\Model;

class thread extends Model
{
    public function posts(){        
        return $this->hasMany(post::class);
    }

    public function user(){        
        return $this->belongsTo(User::class);
    }

    public function upvote(){          
    return $this->hasManyThrough('App\User', 'App\upvote', 'thread_id', 'id','id','user_id');
    
    }
    public function downvote(){        
     
    return $this->hasManyThrough('App\User', 'App\downvote', 'thread_id', 'id','id','user_id');
        
    }
    public function image(){     
        return $this->hasMany(image::class);
    }

    public function section(){        
        return $this->belongsTo(section::class);
    }
}
