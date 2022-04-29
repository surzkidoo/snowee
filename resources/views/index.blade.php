<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{csrf_token()}}" />
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
    <title>Home | Snowy</title>
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
                @guest
                <button class="login-button">Login</button>
                <button class="sign-up-button">Sign up</button>
                @endguest
                @auth
                <div class="profile-dropdown">
                <img src="http://127.0.0.1:8000/{{auth()->user()->avatar}}" alt="avatar" class="avatar"> 
                <div class="profile-up"></div> 
                </div>
                @endauth
                   <div class="container-header">
                   <input type="text" placeholder="search here">
                    <div class="fa fa-search header-search" style="color:#8c00ff;"></div>
                </div>
            </div>
          </div> 
          
   </header>
        <div class="second-header-upper">
        <div class="second-header">
            <h4 class="popular"><span class="first-second-header active">Popular <span class="fa fa-fire fire-emoji"></span></span></h4>
            <h4 class="personalized"><span class="second-second-header">Personal  <span class="fa fa-user fire-emoji-2"></span></span></h4>
       </div>
       <div class="second-header-line"></div>
       </div>
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
    <div class="forums-list home" id="forums-list home">
    <a href="contest.html"><p><span class="fa fa-layer-group"></span> Contest</p></a>
    <a href="finance.html"><p><span class="fa fa-euro-sign"></span> Finance</p></a>
          <a href="diary.html"><p><span class="fa fa-book-open"></span> Diaries</p></a>
          <a href="education.html"><p><span class="fa fa-school"></span> Education</p></a>
          <a href="entertainment.html"><p><span class="fa fa-glass-cheers"></span> Entertainment</p></a>
        </div>
        
        <div class="ad-spaces">
             <div class='ad-1'></div>
         </div>
         <div class="body container-home ">
          <!-- postsec -->
    </div>
    <div class="body personalized-home " style='display:none;'>
          <!-- postsec -->
         </div>
    </div>
    </div>
    <div class="resting-nav-bar">
        <li> <a href="/" style="border-bottom: 2px solid #ffffff"><div class="hello fa fa-home"></div></a></li>
        <li><a href="/section"><div class="hello fa fa-users"></div></a></li>
        <li><a href="notifications.html"><div class="hello fa fa-bell"></div></a></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>
    </div>
    <script src="main.js"></script>
    <script src="index.js"></script>
</body>
</html>