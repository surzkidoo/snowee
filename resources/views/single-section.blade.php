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
        <div class="container-div">
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
        </div>
        <div class="collapsible-menu" id="collapsible-menu">
            <ul>
                <li class="different-li"><img src="http://127.0.0.1:8000/avatar.png" alt="thumbnail" class="avatar">
                    <p class="username">@muhammad</p>
                </li>
                <li><a href="profile.html">View profile</a></li>
                <li><a href="followers.html">Followers</a></li>
                <li><a href="following.html">Following</a></li>
                <li><a href="signup.html">Log out</a></li>
                <li class="stat">stats: 208,456 members</li>
            </ul>
        </div>
        <div class="header-container">
            <h1>Preen</h1>
            <div class="container-header">
            <div class="fa fa-plus-circle post-icon"></div>
            <div class="fa fa-search search"></div>
            </div>
        </div>
    </header>
    <div class="full-content">
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
                        Snowy</span></h1>
                <p>{{ $section->description }}</p>
            </div>
            <div class="section-button" id="section-btn">
                <button><span class="most-viewed current">Most Viewed</span></button>
                <button><span class="update-topic">Updated</span></button>
                <button><span class="new-topic">New</span></button>
            </div>
        </div>
        <div class="post-main">
          <div class="most-viewed-content">
          <div class="card">
                <div class="image-head">
                <img src="http://127.0.0.1:8000/avatar.png" alt="thumbnail">
                   <div class="username"><a href="profile.html" class="this">@muhammad </a><p class="details">originally posted in<a href="section/relationship">relationship</a></p></div>
                </div>
                   <div class="content-box">
                   <h1>Welcome to Snowy!</h1>
                   <p>aaaaa</p>
                   <div class="post-image">
                       
                   </div>
                   <div class="post-tools">
                        <p class="like"></p><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-1"></div> <span class="like-counter">1</span><p></p>
                        <p class="dislike"></p><div class="fa fa-arrow-circle-down d-vote" id="downvote" upid="thread_id-1"></div> <span class="dislike-counter">0</span><p></p> 
                        <p class="dislike"></p><div class="fa fa-comment" id="comment"></div> <span class="comment-counter">28</span><p></p> 
                        <button class="see-more"><a href="welcome-to-snowy">more...</a></button>
                   </div>
                    </div>
           </div>
           <div class="card">
                <div class="image-head">
                <img src="http://127.0.0.1:8000/avatar.png" alt="thumbnail">
                   <div class="username"><a href="profile.html" class="this">@muhammad </a><p class="details">originally posted in<a href="section/relationship">relationship</a></p></div>
                </div>
                   <div class="content-box">
                   <h1>Welcome to Snowy!</h1>
                   <p>aaaaa</p>
                   <div class="post-image">    
                   </div>
                   <div class="post-tools">
                        <p class="like"></p><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-1"></div> <span class="like-counter">1</span><p></p>
                        <p class="dislike"></p><div class="fa fa-arrow-circle-down d-vote" id="downvote" upid="thread_id-1"></div> <span class="dislike-counter">0</span><p></p> 
                        <p class="dislike"></p><div class="fa fa-comment" id="comment"></div> <span class="comment-counter">28</span><p></p> 
                        <button class="see-more"><a href="welcome-to-snowy">more...</a></button>
                   </div>
                    </div>
           </div>
           </div>

    <div class="updated-topics">
            <div class="card">
                <div class="image-head">
                <img src="http://127.0.0.1:8000/avatar.png" alt="thumbnail">
                   <div class="username"><a href="profile.html" class="this">@muhammad </a><p class="details">originally posted in<a href="section/relationship">relationship</a></p></div>
                </div>
                   <div class="content-box">
                   <h1>Welcome to Snowy!</h1>
                   <p>aaaaa</p>
                   <div class="post-image">    
                   </div>
                   <div class="post-tools">
                        <p class="like"></p><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-1"></div> <span class="like-counter">1</span><p></p>
                        <p class="dislike"></p><div class="fa fa-arrow-circle-down d-vote" id="downvote" upid="thread_id-1"></div> <span class="dislike-counter">0</span><p></p> 
                        <p class="dislike"></p><div class="fa fa-comment" id="comment"></div> <span class="comment-counter">28</span><p></p> 
                        <button class="see-more"><a href="welcome-to-snowy">more...</a></button>
                   </div>
                    </div>
           </div>
        <div class="update-no-content"></div>
    </div>
    <div class="new-topics-content">
        <div class="new-topic-no-content"></div>
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
