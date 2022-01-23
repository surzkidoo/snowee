<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{csrf_token()}}" />
    <link rel="stylesheet" href="{{url('style.css')}}">
    <title>Following | Snowy</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous">
</script>
</head>
<body>
    <header>
        <div class="container-div">
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
       </div>
        <div class="collapsible-menu" id="collapsible-menu">
            <ul>
            <li class="different-li"><img src="img/img_avatar.png" alt=""> <p>@muhammad</p> </li>
            <li><a href="profile.html">View profile</a></li>
           <li><a href="followers.html">Followers</a></li>
           <li><a href="following.html">Following</a></li>
           <li><a href="signup.html">Log out</a></li>
           <li class="stat">Stats: 208,456 members</li>
       </ul>
     </div>
          <div class="header-container">
                <h1>Snowy</h1>
          </div> 
    </header>

    <div class="following-container">
        <div class="following-stat" id="user_id" fid="{{$user->username}}">
            <h3>Following</h3>
            <h3 class="following-count">{{count($user->following)}}</h3>
        </div>
        <div class="following-area" id="following-area" authid="{{auth()->user()->id}}">

            
        </div>
     </div>
     <div class="resting-nav-bar">
        <li> <a href="index.html"><div class="hello fa fa-home"></div></a></li>
        <li><a href="section.html"><div class="hello fa fa-users"></div></a></li>
        <li><a href="notifications.html"><div class="hello fa fa-bell"></div></a></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>
    </div> 

<script src="{{url('following.js')}}"></script>
<script src="{{url('main.js')}}"></script> 
</body>
</html>