<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class section extends Model
{
    protected $guarded = [];
    public function threads(){        
        return $this->hasMany(thread::class);
    }
}
