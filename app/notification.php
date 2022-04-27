<?php

namespace App;

use App\notification_type;
use Illuminate\Database\Eloquent\Model;

class notification extends Model
{
    public function type(){        
        return $this->belongsTo(notification_type::class);
    }
    
    public function user(){        
        return $this->belongsTo(User::class);
    }

    public function userInvoker(){
          
        return $this->belongsTo(User::class,'event_user_id');
    
    }
}
