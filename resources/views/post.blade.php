<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{csrf_token()}}" />
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
    <title>{{$thread->title}} | Snowy</title>
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
            <li class="different-li"><img src="img/img_avatar.png" alt=""> <p id="id">@muhammad</p> </li>
            <li><a href="profile.html">View Profile</a></li>
           <li><a href="followers.html">Followers</a></li>
           <li><a href="following.html">Following</a></li>
           <li><a href="signup.html">Log out</a></li>
           <li class="stat">Stats: 208,456 members</li>
          </ul>
       </div>
          <div class="header-container">
                <h1>Snowy</h1>
                <div class="container-header">
                <div class="fa fa-search"></div>
                <div class="fa fa-plus-circle"></div>
            </div>
          </div> 
   </header>
    <div class="post-container">
        <h1>{{$thread->title}}</h1>
        <div class="options" id="options">
            <div class="sect1">
                <p class="views">{{$thread->views}} <span class="fa fa-eye"></span></p>
                <p class="commnt">{{count($thread->posts)}} <span class="fa fa-comment"></span></p>
            </div>
            <button class="follow-topic" id="{{$thread->id}}">Follow</button>
        </div>
        <div class="card">
            <div class="image-head">
               <img src="{{url($thread->user->avatar)}}" alt="thumbnail" class="user-avatar">
               <div class="username">{{"@".$thread->user->username}}<div class="fa fa-check-circle" id="checked"></div><p             
               class="details">originally posted in<a 
               href="{{$thread->section->name}}">{{$thread->section->name}}</a></p></div>
            </div>
            <p class="content">{{$thread->content}}</p>
            @foreach($thread->image as $image)
            <div class="post-image">

                <img src="{{$image->url}}" alt="image">
            </div>
            @endforeach
            <div class="post-tools">
                 <p class="like"><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-{{$thread->id}}"></div> <span class="like-counter">{{count($thread->upvote)}}</span></p>
                 <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="thread_id-{{$thread->id}}"></div> <span class="dislike-counter">{{count($thread->downvote)}}</span></p> 
                 <p class="share"><div class="fa fa-share-alt" id="share"></div></p>
            </div>
        <div class="comment-text">
           <textarea class="post" placeholder="write a comment" rows="1"></textarea>
           <button class="link"><div class="fa fa-paperclip" id="link-it"></div></button>
           <button class="send"><div class="fa fa-share" id="do-comment"></div></button>
        </div>
    </div>

    <div class="comments-section">
      
    </div>
</div>
    
    <div class="resting-nav-bar">
        <li> <a href="index.html"><div class="hello fa fa-home"></div></a></li>
        <li><a href="section.html"><div class="hello fa fa-users"></div></a></li>
        <li><a href="notifications.html"><div class="hello fa fa-bell"></div></a></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>
    </div>

<script src="main.js"></script> <script src="post.js"></script>
</body>
</html>

