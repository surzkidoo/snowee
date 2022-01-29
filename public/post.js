//const { functions } = require("lodash");

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
let isFollwing = false;
follow.addEventListener('click', ()=>{
   if(!isFollwing){
       follow.innerHTML = 'Following';
       isFollwing = true;
    const card = document.querySelector('.card').innerHTML;
    localStorage.setItem("card", JSON.stringify(card))
   } else if(isFollwing){
    follow.innerHTML = 'Follow';
    isFollwing = false;
    localStorage.removeItem('card')
   }
})

//setting up upvote button


//setting up downvote holder


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
               <div class="edited">(edited)</div>
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
    
     const newdata = data.map(post=>{
       return`
          <div class="comments">
            <div class='flex-comment'>
            <img src="${post.user.avatar}" alt="commenter">
            <div class="commenters-name">@${post.user.username}<p             
            class="date">${post.created_at}</p></div>
            </div>
            <p class="comment-content">${post.content}</p>
            <div class="edited">(edited)</div>
            <div class="post-tools" id="comments-icons">
            <p class="like"><div class="fa fa-arrow-circle-up u-vote"id="upvote" upid="post_id-${post.id}"></div> <span class="like-counter">${post.upvote_count}</span></p>
            <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="post_id-${post.id}"></div> <span class="dislike-counter">${post.downvote_count}</span></p> 
            <div class="side-comment">
                <p class="delete-side-comment">delete</p>
                <p class="edit-side-comment">edit</p>
                <p class="edit-reply-comment">reply</p>
                <p class="edit-side-comment">report</p>
            </div>
            </div>
            </div>
            <div class="comment-text">
            <textarea class="post" placeholder="write a comment" rows="1"></textarea>
            <button class="link"><div class="fa fa-paperclip" id="link-it"></div></button>
            <button class="send"><div class="fa fa-share" id="do-comment"></div></button>
         </div>
         `
     ;
     })
     $(".comments-section").append(newdata);
     

     upVoteHandle()
downVoteHandle()
   const comments = document.querySelectorAll('.comments');
   comments.forEach((comment)=>{
     let commentDelete = comment.querySelector('.edit-side-comment');
     commentDelete.addEventListener('click', (e)=>{
      let editComment = document.querySelector('.edit-comment').style.display = 'block';
       let target = e.target.parentElement.parentElement.parentElement;
      let inputName = target.querySelector('.comment-content').innerHTML;
  
     let postContainer = document.querySelector('.post-content');
     let textareaContent = document.querySelector('.comment-textarea');
     textareaContent.value = inputName;
     postContainer.style.filter = 'blur(1px)';

     let updateComment = document.querySelector('.update-comment');
     updateComment.addEventListener('click', ()=>{
      let textareaContent = document.querySelector('.comment-textarea');
      let inputName = target.querySelector('.comment-content');
      inputName.innerHTML = textareaContent.value
      let editComment = document.querySelector('.edit-comment').style.display = 'none';
      let postContainer = document.querySelector('.post-content');
      let edited = target.querySelector('.edited').style.display = 'block'
      postContainer.style.filter = 'blur(0px)';
     })
     let closeEdit = document.querySelector('#close-edit-menu');
     closeEdit.addEventListener('click', ()=>{
       postContainer.style.filter = 'blur(0px)';
       let editComment = document.querySelector('.edit-comment').style.display = 'none';
     })

   })
  });

comments.forEach((comment)=>{
    let reply = comment.querySelector('.edit-reply-comment');
  })

var deleteThis = $('.delete-side-comment');
 deleteThis.on('click', function(){
   deletePost()
 })

    }
  },
  error: function(e){
      console.log(e);
  }

});

const deletepostPost = document.querySelector('.delete-post-post');
const editpostPost = document.querySelector('.edit-post-post');
const reportPost = document.querySelector('.report-post');

reportPost.addEventListener('click', ()=>{
  reportThisPost()
})

deletepostPost.addEventListener('click', ()=>{
  deleteThisPost()
});

editpostPost.addEventListener('click', ()=>{
  editThisPost()
});


function editThisPost(){
  let threadName = document.querySelector('.thread-title');
  let inputName = document.querySelector('#post-name');
  let postContent = document.querySelector('.content');
  let postContainer = document.querySelector('.post-content')
  let editPost = document.querySelector('.edit-profile-element').style.display = 'block';
  let textareaContent = document.querySelector('.new-bio-data');
  textareaContent.value = postContent.innerHTML;
  inputName.value = threadName.innerHTML;
  postContainer.style.filter = 'blur(1px)';

  let submit = document.querySelector('.submit-changes')
  submit.addEventListener('click', ()=>{
    let postContainer = document.querySelector('.post-content')
    postContent.innerHTML = textareaContent.value;
    threadName.innerHTML = inputName.value;
    let edited = document.querySelector('.edited').style.display = 'block'
    let editPost = document.querySelector('.edit-profile-element').style.display = 'none';
    postContainer.style.filter = 'blur(0px)';
  })

  let closeEdit = document.querySelector('.close-menu');
  closeEdit.addEventListener('click', ()=>{
    let postContainer = document.querySelector('.post-content')
    let editPost = document.querySelector('.edit-profile-element').style.display = 'none';
    postContainer.style.filter = 'blur(0px)';
  })
}

function deleteThisPost(){
  let deleteModal = document.querySelector('#delete-post').style.display = 'block';
  let postContainer = document.querySelector('.post-content')
  postContainer.style.filter = 'blur(1px)';

  //close modal
  let closeDelete = document.querySelector('#close-menu');
  closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let deleteModal = document.querySelector('#delete-post').style.display = 'none';
  })
}

//Comment delete post and edit post
function deletePost(){
  let deleteModal = document.querySelector('.delete-comment').style.display = 'block';
  let postContainer = document.querySelector('.post-content');
  postContainer.style.filter = 'blur(1px)';

  //close modal
  let closeDelete = document.querySelector('.close-comment');
  closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
  })
}

function reportThisPost(){
    let showReport = document.querySelector('.report-post-modal').style.display = 'block';
    let postContainer = document.querySelector('.post-content');
    postContainer.style.filter = 'blur(1px)';

    //close modal
  let closeDelete = document.querySelector('#close-report-menu');
  closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let showReport = document.querySelector('.report-post-modal').style.display = 'none';
  })
}