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
        <div class="container-div">
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
       </div>
        <div class="collapsible-menu" id="collapsible-menu">
            <ul>
            <li class="different-li"><img src="http://127.0.0.1:8000/avatar.png" alt=""> <p id='id'  loggin-id="{{auth()->check()? auth()->user()->id :0}}">@muhammad</p> </li>
            <li><a href="profile.html">View Profile</a></li>
           <li><a href="followers.html">Followers</a></li>
           <li><a href="following.html">Following</a></li>
           <li><a href="signup.html">Log out</a></li>
           <li class="stat">Stats: 208,456 members</li>
          </ul>
       </div>
          <div class="header-container">
                <h1>Preen</h1>
                <div class="container-header">
                <div class="fa fa-search header-search"></div>
            </div>
          </div> 
   </header>
        <div class="second-header">
            <h4 class="popular"><span class="first-second-header active">Popular <span class="fa fa-fire fire-emoji"></span></span></h4>
            <h4 class="personalized"><span class="second-second-header">Personal  <span class="fa fa-user fire-emoji-2"></span></span></h4>
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
       <div class="body container-home ">
          <!-- postsec -->
    </div>
    <div class="body personalized-home ">
          <!-- postsec -->
    </div>
    </div>
    <div class="resting-nav-bar">
        <li> <a href="/"><div class="hello fa fa-home"></div></a></li>
        <li><a href="/section"><div class="hello fa fa-users"></div></a></li>
        <li><a href="notifications.html"><div class="hello fa fa-bell"></div></a></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>
    </div>
    <script src="index.js"></script>
    <script src="main.js"></script>
</body>
</html>