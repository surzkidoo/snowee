<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255|min:3",
            "dob" => "required",
            "email"=>"required|email|string|max:255|min:3|unique:users|email",
            "username"=>"required|string|unique:users",
            "password"=>"required"
        ]);


        if ($validator->fails())   //check all validations are fine, if not then redirect and show error messages
        {
            return response()->json($validator->errors(),422);  
            // validation failed return back to form

        } else {
            //validations are passed, save new user in database
            $User = new User;
            $User->email = $request->email;
            $User->fullname = $request->name;
            $User->username = $request->username;
            $User->dob = $request->dob;
            $User->password = bcrypt($request->password);
            $User->save();
            
            return response()->json(["status"=>true,"msg"=>"You have successfully registered, Login to access your dashboard","redirect_location"=>url("login")]);  
           
        }
        
    }

   
    public function login(Request $request){
        
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',   // required and email format validation
            'password' => 'required|string', // required and number field validation

        ]); // create the validations
        if ($validator->fails())   //check all validations are fine, if not then redirect and show error messages
        {
            return response()->json($validator->errors(),422);  
            // validation failed return with 422 status

        } else {
            //validations are passed try login using laravel auth attemp
            if (Auth::attempt($request->only(["username", "password"]))) {
                return response()->json(["status"=>true,"redirect_location"=>url("/")]);
                
            } else {
                return response()->json([["Invalid credentials"]],422);
            }
        }

    }

    public function registerPage(){

        return view('signup');
    }

    public function loginPage(){

        return view('login');
    }
}
