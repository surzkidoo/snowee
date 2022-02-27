<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{ csrf_token() }}" />
    <link rel="stylesheet" href="{{ url('style.css') }}">
    <title>{{ $user->username }} | Snowy</title>
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
                <li class="different-li"><img src="http://127.0.0.1:8000/avatar.png" alt="commenter">
                    <p>@muhammad</p>
                </li>
                <li><a href="profile.html">View profile</a></li>
                <li><a href="followers.html">Followers</a></li>
                <li><a href="following.html">Following</a></li>
                <li><a href="signup.html">Log out</a></li>
                <li class="stat">Stats: 208,456 members</li>
            </ul>
        </div>
        <div class="header-container">
            <h1>Preen</h1>
            <div class="container-header">
                <div class="fa fa-search"></div>
            </div>
        </div>
    </header>
    <div class="main">
        <div class="profile-grid-container">   
            <h2><span>Profile</span></h2>
            <span class="fa fa-envelope" id="profile-envelope"></span>
        </div>
        <div class="profile-grid" id="profile-grid">
          <div class="image-div"><img src="{{ url($user->avatar) }}" alt="profile" id="changed-image"></div>
            <div>
                <p class="user" id="{{ $user->id }}">{{ '@' . $user->username }}<span class="fa fa-check-circle profile-check"></span></p>
                <p class="profile-bio">{{ $user->bio }}</p>
            </div>
            <div class="followers-following-container">
            <div class="followers">Followers: 1000</div>
            <div class="following">Following: 1000</div>
            </div>
            @if (auth()->check())
                @if (auth()->user()->id == $user->id)
                    <button class="edit-profile">Edit profile</button>
                @else
                    <div class="button-container" id="button-container">
                    <button class="add" fbid="{{$user->id}}">{{$follow==1?'Following':'Follow'}}</button>
                    @if($blocked!=-1)
                     <button class="block">{{$blocked==1?'Blocked':'Block'}}</button>
                    @endif
                </div>
             @endif
             @endif

        </div>
        <div class="profile-container">
            <div class="profile-section">
                <p class="topics current"><span>Topics</span></p>
                <p class="posts"><span>Posts</span></p>
                <p class="upvotes"><span>Upvoted</span></p>
            </div>
            <div class="upvote">oops!, no upvoted post</div>
            <div class="postf"></div>
            <div class="topic"></div>
        </div>
    </div>


    </div>
    <div class="resting-nav-bar">

        <li> <a href="/"><div class="hello fa fa-home"></div></a></li>
        <li><a href="/section"><div class="hello fa fa-users"></div></a></li>
        <li><a href="notifications.html"><div class="hello fa fa-bell"></div></a></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>

    </div>

    <div class="edit-profile-element">
        <p class="close-menu">x</p>
        <h1>Edit Profile</h1>
        <div class="flex-input">
            <span class="exceed-length"></span>
            <label>Change Bio</label>
            <textarea type="text" class="new-bio-data" placeholder="write your bio here"></textarea>
            <label>Change display picture</label>
            <input type="file" class="add-photos" id="upload-image">
        </div>
        <button class="submit-changes">Update Profile</button>
    </div>
    </div>
    <script src="{{ url('main.js') }}"></script>
    <script src="{{ url('user.js') }}"></script>
    <script src="{{ url('profile.js') }}"></script>
</body>

</html>
