//views, comments,upvotes and follow topic
const upvotes = document.querySelector('#upvote').innerHTML;
const views = document.querySelector('.views');
const commentsArray = document.querySelector('.comments-section');
const commentLength = commentsArray.querySelectorAll('.comments').length;
const commentCounter = document.querySelector('.commnt');
const upvotesCountHolder =document.querySelector('.upvotes');
const follow = document.querySelector('.follow-topic');
$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
  }
});
views.addEventListener("DOMContentLoad", ()=>{
   //to be implemented with backend
})

//setting up follow
follow.addEventListener('click', ()=>{
  let id= $('.follow-topic')[0].id
  jQuery.ajax({
    url: `http://127.0.0.1:8000/thread/${id}/follow`,
    method: 'get',
    success: function(data){
     
      if(data==1){
        follow.innerHTML = 'Following';
    } else if(data==0){
     follow.innerHTML = 'Follow';
    }
      
    },
    error: function(e){
        console.log(e);
    }
  
  });
})


//setting up comment box
const post = document.querySelector('.post');
 post.addEventListener('keyup', ()=>{
     if(post.value.length > 112){
       post.rows = '5';
     } else if(post.value.length > 34){
         post.rows = '3';
     }
     else if(post.value.length < 34){
         post.rows = '1';
     }
     //console.log(post.value.length);
 });

 let commentList = document.querySelector('.comments-section');

 //setting up commenting functionality
 const doComment = document.querySelector('.send');
 doComment.addEventListener('click',()=>{ 
    //  //removing no-comment message
    //  let noCommentMessage = document.querySelector('.no-comment-message');
    //  noCommentMessage.style.display = 'none'
     //getting comment content
     let commentContent = document.querySelector('.post').value;
     //check if comment value is empty
     if(commentContent === ''){
       let postBox = document.querySelector('.post');
       postBox.style.border = '2px solid red';
       postBox.placeholder = 'please input comment';
       //postBox.style.color = 'rgb(114, 114, 110)'
     } else {
      
      jQuery.ajax({
        url: "http://127.0.0.1:8000/post",
        method: 'post',
        data:{
          thread_id:$('.follow-topic')[0].id,
          content:commentContent

        },
        success: function(data){
          if(data){
            console.log(data);
           const newdata =
                `
               <div class='flex-comment'>
               <img src="" alt="commenter">
               <div class="commenters-name">{{'@'.$post->user->username}}<p             
               class="date">{{$post->created_at->diffForHumans()}}</p></div>
               </div>
               <p class="comment-content">{{$post->content}}</p>
               <div class="post-tools" id="comments-icons">
               <p class="like"><div class="fa fa-arrow-circle-up"id="upvote"></div> <span class="like-counter">{{count($post->upvote)}}</span></p>
               <p class="dislike"><div class="fa fa-arrow-circle-down"id="downvote"></div> <span class="dislike-counter">{{count($post->downvote)}}</span></p> 
               <p class="share"><div class="fa fa-share-alt" id="share"></div></p>
               </div>
               `
           ;
           $(".comments").append(newdata);
           console.log(data)
          }
        },
        error: function(e){
            console.log(e);
        }
      
      });
     }  
})

thread_id=$('.follow-topic')[0].id,
jQuery.ajax({
  url: `http://127.0.0.1:8000/thread/${thread_id}/posts`,
  method: 'get',
  success: function(data){
    if(data){
      console.log(data);
    
     const newdata = data.data.map(post=>{
       return`
          <div class="comments">
            <div class='flex-comment'>
            <img src="${post.user.avatar}" alt="commenter">
            <div class="commenters-name">@${post.user.username}<p             
            class="date">${post.created_at}</p></div>
            </div>
            <p class="comment-content">${post.content}</p>
            <div class="post-tools" id="comments-icons">
            <p class="like"><div class="fa fa-arrow-circle-up u-vote"id="upvote" upid="post_id-${post.id}"></div> <span class="like-counter">${post.upvote_count}</span></p>
            <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="post_id-${post.id}"></div> <span class="dislike-counter">${post.downvote_count}</span></p> 
            <p class="share"><div class="fa fa-share-alt" id="share"></div></p>
            </div>
            </div>
         `
     ;
     })
     $(".comments-section").append(newdata);
     initPagination(data.first_page_url.split('=')[0],2,'.comments-section',false)
     upVoteHandle()
downVoteHandle()
    }
  },
  error: function(e){
      console.log(e);
  }

});

