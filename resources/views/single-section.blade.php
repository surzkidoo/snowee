<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{ csrf_token() }}" />
    <link rel="stylesheet" href="{{ url('style.css') }}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
    <title>{{ $section->name }} | Snowy</title>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous">
    </script>
</head>

<body>
<header>
       
       <div class="collapsible-menu" id="collapsible-menu">
           <ul>
           <p id="id"   loggin-id="{{auth()->check()? auth()->user()->id :0}}"></p>
           <li><a href="/user/muhammad">View Profile</a></li>
          <li><a href="/user/followers">Followers</a></li>
          <li><a href="/user/following">Following</a></li>
          <li><a href="/login">Log out</a></li>
          <li class="stat">Stats: 208,456 members</li>
         </ul>
      </div>
         <div class="header-container">
               <h1>Loopy</h1>
               <div class="cont">
               <a href="/login"> <button class="login-button">Login</button> </a>
               <a href="/signup"><button class="sign-up-button">Sign up</button> </a> 
               <div class="profile-dropdown">
               <img src="http://127.0.0.1:8000/{{auth()->user()->avatar}}" alt="avatar" class="avatar"> 
               <div class="profile-up"></div> 
               </div>
                <div class="container-header">
                  <input type="text" placeholder="search here">
                   <div class="fa fa-search header-search" style="color:#8c00ff;"></div>
               </div>
           </div>
         </div> 
         
  </header>
    <div class="edit-profile-element upvote-modal">
        <p class="close-menu" id="close-upvote-modal">x</p>
        <h1>Upvotes</h1>
        <ul class="upvotes-flex" id="upvote-container">
           
        </ul>
    </div>

    <div class="edit-profile-element downvote-modal">
        <p class="close-menu" id="close-downvote-modal">x</p>
        <h1>Downvotes</h1>
        <ul class="upvotes-flex" id="downvote-container">
            
        </ul>
    </div>
    <div class="full-content body">
        <div class="section-part-container">
            <div class="make-post">
                <div class="post-flex">
                    <h1>New Post</h1>
                    <p class="close-post">x</p>
                </div>
                <div class="header-and-emoji">
                <input type="text" id="heading-header" class="heading-header" placeholder="write your heading here...">
                <div class="heading-emoji"></div>
                </div>
                <div class="text-content-emoji-icon"></div>
                <textarea id="heading-content" class="text-content-emoji" placeholder="you can only post 245 characters as we are still working on the back-end."></textarea>
                <br>
                <div class="post-add-container">
                <button class="new-post">Post</button>
                <input type="file" class="add-photos" multiple id="upload-image">
                </div>
                <br>
                <a href="community.html" target="_blank" class="guidelines">read our community guidelines</a>
            </div>
            <div class="first-header">
                <h1><span><span class="section-name" id="{{ $section->id }}">{{ $section->name }}</span>-
                        Snowy</span>  <div class="fa fa-plus-circle post-icon"></div></h1>
                <p>{{ $section->description }}</p>
              
            </div>
            <div class="section-button" id="section-btn">
                <button><span class="most-viewed current">Most Viewed</span></button>
                <button><span class="update-topic">Trending</span></button>
                <button><span class="new-topic">New</span></button>
            </div>
        </div>
        <div class="post-main">
          <div class="most-viewed-content">
          
           </div>

    <div class="updated-topics">
            
          
        {{-- <div class="update-no-content"></div> --}}
    </div>
    <div class="new-topics-content">
        {{-- <div class="new-topic-no-content"></div> --}}
    </div>
        </div>
    </div>
    <div class="no-content-display"></div>
    <div class="resting-nav-bar">
        <li> <a href="/"><div class="hello fa fa-home"></div></a></li>
        <li><a href="/section"><div class="hello fa fa-users"></div></a></li>
        <li><a href="notifications.html"><div class="hello fa fa-bell"></div></a></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>
    </div>
    <script src="{{ url('section.js') }}"></script>
    <script src="{{ url('main.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/emoji-button@0.6.0/dist/index.min.js"></script>
</body>

</html>
