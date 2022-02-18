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
          </ul>
       </div>
          <div class="header-container">
                <h1>Snowy</h1>
                <div class="container-header">
                <div class="fa fa-search"></div>
            </div>
          </div> 
   </header>
   <div class="post-content">
    <div class="post-container">
        <h1 class="thread-title">{{$thread->title}}</h1>
        <div class="options" id="options">
            <div class="sect1">
                <p class="views">{{$thread->views}} <span class="fa fa-eye"></span></p>
                <p class="commnt">{{count($thread->posts)}} <span class="fa fa-comment"></span></p>
            </div>
            <button class="follow-topic" id="{{$thread->id}}">
            @if($follow)
                 Following
            @else
                Follow
            @endif
            </button>
        </div>
        <div class="card">
            <div class="image-head">
               <img src="{{url($thread->user->avatar)}}" alt="thumbnail" class="user-avatar">
               <div class="username">{{"@".$thread->user->username}} <div class="fa fa-check-circle" id="checked"></div><p             
               class="details">originally posted in<a 
               href="{{$thread->section->name}}.toLowerCase()">{{$thread->section->name}}</a></p></div>
            </div>
            <p class="content">{{$thread->content}}</p>
            @foreach($thread->image as $image)
            <div class="post-image">

                <img src="{{$image->url}}" alt="image">
            </div>
            @endforeach
            <div class="edited">(edited)</div>
            <div class="post-tools">
                 <p class="like"><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-{{$thread->id}}"></div> <span class="like-counter this-counter">{{count($thread->upvote)}}</span></p>
                 <p class="dislike"><div class="fa fa-arrow-circle-down d-vote" id="downvote" upid="thread_id-{{$thread->id}}"></div> <span class="dislike-counter this-dislike">{{count($thread->downvote)}}</span></p> 
                 <p class="share"><div class="fa fa-share-alt" id="share"></div></p>
                <div class="side-comment">
                 <p><div id="delete-icon" class="fa fa-trash-alt delete-post-post"></div></p>
                <p><div id="edit-icon" class="fa fa-edit edit-post-post"></div></p>
                 <p><div id="report-icon" class="fa fa-exclamation-triangle report-post"></div></p>
            </div> 
            </div>
        <div class="comment-text">
           <textarea class="post post-emoji" placeholder="write a comment" rows="1"></textarea>
           <button class="link"><div class="emoji-button" id="link-it"></div></button>
           <button class="link"><div class="fa fa-paperclip link-it" id="link-it"><input type="file" id="image-upload"  class="fa fa-paperclip" multiple=""></div></button>
           <button class="send"><div class="fa fa-share" id="do-comment"></div></button>
        </div>
        <div class="box-image-holder">
        </div>
    </div>
    </div>
    <div class="comments-section">
        <div class="sort">
          <select>
            <option value="oldest">Oldest</option>
              <option value="mostupvote">Most upvoted</option>
              <option value="recent">Most recent</option>
          </select>
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
        <h1>Edit Post</h1>
        <div class="flex-input">
            <input type="text"  id="post-name" placeholder="input bio data here">
            <label></label>
            <textarea class="new-bio-data" id="edit-post-textarea" cols="30" rows="10"></textarea>
        </div>
        <button class="submit-changes">Update Post</button>
    </div>

    <div class="edit-profile-element" id="delete-post">
        <p class="close-menu" id="close-menu">x</p>
        <h1>Delete Post</h1>
           <div class="delete-p">Are you <span>really</span> sure you want to delete this?</div>
         <div class="delete-buttons">
           <button class="submit-changes yes-delete">Yes</button>
           <button class="submit-changes no-delete">No</button>
        </div>
    </div>

    <div class="edit-profile-element delete-comment" id="delete-post">
        <p class="close-menu close-comment" id="close-menu">x</p>
        <h1>Delete comment</h1>
           <div class="delete-p">Are you <span>really</span> sure you want to delete this?</div>
         <div class="delete-buttons">
           <button class="submit-changes yes-delete-comment yes-reply-comment">Yes</button>
           <button class="submit-changes no-delete-comment no-reply-comment">No</button>
        </div>
    </div>

    <div class="edit-profile-element edit-comment">
        <p class="close-menu" id="close-edit-menu">x</p>
        <h1>Edit comment</h1>
        <div class="flex-input">
            <textarea class="new-bio-data comment-textarea" id="edit-post-textarea" cols="30" rows="10"></textarea>
        </div>
        <button class="submit-changes update-comment">Update comment</button>
    </div>

    <div class="edit-profile-element report-post-modal">
        <p class="close-menu" id="close-report-menu">x</p>
        <h1>Report post</h1>
        <div class="flex-input">
            <textarea class="new-bio-data comment-textarea" id="edit-post-textarea" cols="30" rows="5" placeholder="Write your report here"></textarea>
        </div>
        <button class="submit-changes update-comment">Report</button>
    </div>

    <div class="edit-profile-element report-comment-modal">
        <p class="close-menu" id="close-report-comment">x</p>
        <h1>Report comment</h1>
        <div class="flex-input">
            <textarea class="new-bio-data comment-textarea" id="edit-post-textarea" cols="30" rows="5" placeholder="Write your report here"></textarea>
        </div>
        <button class="submit-changes update-comment">Report</button>
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

    <div class="edit-profile-element share-modal">
        <p class="close-menu" id="close-share-modal">x</p>
        <h1>Share</h1>
        <ul class="upvotes-flex">
            <li class="upvote-card">
            <img src="http://127.0.0.1:8000/ic-twitter.png" alt="img">
                <div class="button" data-sharer="twitter" data-title="Checkout PreenTok!" data-hashtags="awesome, sharer.js" data-url="https://nairaland.com/">Share</div>
            </li>
            <li class="upvote-card">
            <img src="http://127.0.0.1:8000/ic-facebook.png" alt="img">
                <div class="button" data-sharer="facebook" data-hashtag="PreenTok" data-url="https://preentok.com">Share</div>
            </li>
            <li class="upvote-card">
            <img src="http://127.0.0.1:8000/whatspp.jfif" alt="img" width="50" height="50">
                <div class="button" data-sharer="whatsapp" data-title="Checkout Sharer.js!" data-url="https://preetok.com/">Share</div>
            </li>
        </ul>
    </div>
<script src="main.js"></script> 
<script src="post.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sharer.js@latest/sharer.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/emoji-button@0.6.0/dist/index.min.js"></script>
<script>
      window.addEventListener('DOMContentLoaded', () => {
  EmojiButton(document.querySelector('.emoji-button'), function (emoji) {
    document.querySelector('.post-emoji').value += emoji;
  });
});
</script>
</body>
</html>

