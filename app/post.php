<?php

namespace App;

use App\tag;
use App\User;
use App\image;
use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    public function user(){        
        return $this->belongsTo(User::class);
    }

    public function image(){        
        return $this->hasMany(image::class);
    }

    public function tag(){        
        return $this->hasMany(tag::class);
    }
    public function upvote(){        
        return $this->hasMany(upvote::class);
    }
    public function downvote(){        
        return $this->hasMany(downvote::class);
    }
    
}
