//const { functions } = require("lodash");

//const { lowerCase } = require("lodash");

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
               <p class="comment-content">{{$post->content}}hj</p>
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

let thread_id=$('.follow-topic')[0].id;
jQuery.ajax({
  url: `http://127.0.0.1:8000/thread/${thread_id}/posts`,
  method: 'get',
  success: function(data){
    if(data){
      console.log(data);
    
     const newdata = data.data.map(post=>{
       return`
          <div class="comments" id="${post.id}">
            <div class='flex-comment'>
            <img src="${post.user.avatar}" alt="commenter" class="img-avatar">
            <div class="commenters-name">@${post.user.username}<p             
            class="date">${post.created_at}</p></div>
            </div>
            <p class="comment-content">${post.content}</p>
            <div class="edited">(edited)</div>
            <div class="post-tools" id="comments-icons">
            <p class="like"><div class="fa fa-arrow-circle-up u-vote"id="upvote" upid="post_id-${post.id}"></div> <span class="like-counter">${post.upvote_count}</span></p>
            <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="post_id-${post.id}"></div> <span class="dislike-counter">${post.downvote_count}</span></p> 
            <div class="side-comment">
                <p><div class="fa fa-trash-alt delete-side-comment"></div></p>
                <p><div class="fa fa-edit edit-side-comment"></div></p>
                <p><div class="fa fa-reply edit-reply-comment"></div><span class="comments-number"></span></p>
                <p><div class="fa fa-exclamation-triangle edit-report-comment"></div></p>
            </div>
            </div>
            <div class="div-reply">
            <div class="comment-text comment-menu">
            <textarea class="this-textarea" placeholder="write a comment" rows="1"></textarea>
            <button class="link"><div class="comment-emoji" id="link-it"></div></button>
            <button class="link"><div class="fa fa-paperclip link-it" id="link-it"><input type="file" id="image-upload"  class="fa fa-paperclip" multiple></div></button>
            <button class="send"><div class="fa fa-share" id="do-comment"></div></button>
            </div>
            <div class="box-image-holder"></div>
            </div>
            </div>
         `
     ;
     })
     $(".comments-section").append(newdata);
     initPagination(data.first_page_url.split('=')[0],2,'.comments-section',false)
     upVoteHandle()
    downVoteHandle()
   const comments = document.querySelectorAll('.comments');
   comments.forEach((comment)=>{
     let commentDelete = comment.querySelector('.edit-side-comment');
     commentDelete.addEventListener('click', (e)=>{
      let editComment = document.querySelector('.edit-comment').style.display = 'block';
       let target = e.target.parentElement.parentElement.parentElement;
      let inputName = target.querySelector('.comment-content');
  
     let postContainer = document.querySelector('.post-content');
     let textareaContent = document.querySelector('.comment-textarea');
     textareaContent.value = inputName.innerHTML;
     postContainer.style.filter = 'blur(1px)';

     let updateComment = document.querySelector('.update-comment');
     updateComment.addEventListener('click', ()=>{
      //Updating post
      
      jQuery.ajax({
        url: `http://127.0.0.1:8000/post/${comment.id}`,
        method: 'put',
        data:{
          content:textareaContent.value

        },
        success: function(data){
          if(data){
            inputName.innerHTML = textareaContent.value;
            textareaContent.value='';
            let editComment = document.querySelector('.edit-comment').style.display = 'none';
            let postContainer = document.querySelector('.post-content');
            let edited = target.querySelector('.edited').style.display = 'block';
            postContainer.style.filter = 'blur(0px)';
            
          }
        },
        error: function(e){
            console.log(e);
            textareaContent.value=''
        }
      
      });
   
     
     
     })
     let closeEdit = document.querySelector('#close-edit-menu');
     closeEdit.addEventListener('click', ()=>{
       postContainer.style.filter = 'blur(0px)';
       let editComment = document.querySelector('.edit-comment').style.display = 'none';
     })

   })
  });

//reply functionality
comments.forEach((comment)=>{
  let openReply = false;
    let reply = comment.querySelector('.edit-reply-comment');
    reply.addEventListener('click', (e)=>{
      if(!openReply){
        let replyDiv = comment.querySelector('.div-reply');
       replyDiv.style.display = "block";
       openReply = true;
      } else if(openReply) {
        openReply = false;
        let thisPost = comment.querySelector('.div-reply').style.display = 'none';
        console.log(thisPost); 
      }
    })
  })

//Reply thread functionality
comments.forEach((comment)=>{
  let makeComment = comment.querySelector('.send');
   makeComment.addEventListener('click', (e)=>{
    let target = e.target.parentElement.parentElement.parentElement.parentElement;
    let replyDiv = target.querySelector('.div-reply')
    console.log(target);
    let avatar = target.querySelector('.img-avatar')
    let username = target.querySelector('.commenters-name').innerHTML.slice(0,9);
    let reply = target.querySelector('.this-textarea').value;
    let replyBlock = document.createElement('div');
    replyBlock.classList.add('commenters-comment');
    replyBlock.innerHTML = `
    <div class='flex-comment'>
    <img src="${avatar.src}" alt="commenter" class="img-avatar">
    <div class="commenters-name">${username}<p             
    class="date">2 minutes ago</p></div>
    </div>
    <p class="comment-content">${reply}</p>
    <div class="edited">(edited)</div>
    <div class="post-tools" id="comments-icons">
    <p class="like"><div class="fa fa-arrow-circle-up u-vote"id="upvote"></div> <span class="like-counter reply-like-counter">0</span></p>
    <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote"></div> <span class="dislike-counter reply-dislike-counter">0</span></p> 
    <div class="side-comment">
        <p class="delete-side-comment"><div class="fa fa-trash-alt delete-reply-comment"></div></p>
        <p class="edit-side-comment"><div class="fa fa-edit edit-replied-comment"></div></p>
        <p><div class="fa fa-reply edit-reply-comment comment-reply-reply"></div><span class="comments-number"></span></p>
        <p class="edit-report-comment"><div class="fa fa-exclamation-triangle report-reply-comment"></div></p>
    </div>
    </div>
    <div class="div-reply reply-div">
    <div class="comment-text comment-menu">
    <textarea class="post this-textarea" placeholder="write a comment" rows="1"></textarea>
    <button class="link"><div class="fa fa-paperclip" id="link-it"></div></button>
    <button class="send send-reply"><div class="fa fa-share" id="do-comment"></div></button>
    </div>
    </div>
    `
    //Reply counter
    let length = comment.querySelectorAll('.commenters-comment')
    let commentNumbers = comment.querySelector('.comments-number').innerHTML = `(${length.length+1})`
    replyDiv.append(replyBlock);
    
    //Delete Reply
    let replyDeletes = comment.querySelectorAll('.delete-reply-comment');
    replyDeletes.forEach((replyDelete)=>{
      replyDelete.addEventListener('click',(e)=>{
        let deleteModal = document.querySelector('.delete-comment').style.display = 'block';
        let postContainer = document.querySelector('.post-content');
        postContainer.style.filter = 'blur(1px)';
        //delete functionality
        let deleteThis = document.querySelector('.yes-reply-comment');
        deleteThis.addEventListener('click', ()=>{
          let deleteReply = e.target.parentElement.parentElement.parentElement;
          deleteReply.remove();
          postContainer.style.filter = 'blur(0px)';
          let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
        })
        let noDeleteThis = document.querySelector('.no-reply-comment');
        noDeleteThis.addEventListener('click', ()=>{
          postContainer.style.filter = 'blur(0px)';
          let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
        })
        //close modal
        let closeDelete = document.querySelector('.close-comment');
        closeDelete.addEventListener('click', ()=>{
          postContainer.style.filter = 'blur(0px)';
          let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
        })
       })
    })
   

  //Edit Reply
     let commentDeletes = comment.querySelectorAll('.edit-replied-comment');
     commentDeletes.forEach((commentDelete)=>{
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
   })
 
   //Report funtionality
    let reportReplies = comment.querySelectorAll('.report-reply-comment');
    reportReplies.forEach((reportReply)=>{
       reportReply.addEventListener('click', ()=>{
      let showReport = document.querySelector('.report-comment-modal').style.display = 'block';
      let postContainer = document.querySelector('.post-content');
      postContainer.style.filter = 'blur(1px)';
  
      //close modal
    let closeDelete = document.querySelector('#close-report-comment');
    closeDelete.addEventListener('click', ()=>{
      postContainer.style.filter = 'blur(0px)';
      let showReport = document.querySelector('.report-comment-modal').style.display = 'none';
    })
    })
    })

  //reply upvote counter
    let likeCounters = comment.querySelectorAll('.reply-like-counter');
    likeCounters.forEach((likeCounter)=>{
      likeCounter.addEventListener('click', ()=>{
      let showReport = document.querySelector('.upvote-modal').style.display = 'block';
      let postContainer = document.querySelector('.post-content');
      postContainer.style.filter = 'blur(1px)';
    
      //close modal
       let closeDelete = document.querySelector('#close-upvote-modal');
       closeDelete.addEventListener('click', ()=>{
      postContainer.style.filter = 'blur(0px)';
      let showReport = document.querySelector('.upvote-modal').style.display = 'none';
     })
     })
    })
      
    //reply downvote counter
     let dislikeCounters = comment.querySelectorAll('.reply-dislike-counter');
     dislikeCounters.forEach((dislikeCounter)=>{
        dislikeCounter.addEventListener('click', ()=>{
      let showReport = document.querySelector('.downvote-modal').style.display = 'block';
      let postContainer = document.querySelector('.post-content');
      postContainer.style.filter = 'blur(1px)';
    
      //close modal
       let closeDelete = document.querySelector('#close-downvote-modal');
       closeDelete.addEventListener('click', ()=>{
      postContainer.style.filter = 'blur(0px)';
      let showReport = document.querySelector('.downvote-modal').style.display = 'none';
    })
     })
     })

    //Comment reply's reply😂😂😂
     let replyReplies = comment.querySelectorAll('.comment-reply-reply')
     replyReplies.forEach((replyReply)=>{
        let repReply = false;
    replyReply.addEventListener('click', (e)=>{
      let thisTarget = e.target.parentElement.parentElement.parentElement;
        if(!repReply){
          let replyDiv = thisTarget.querySelector('.reply-div');
         replyDiv.style.display = "block";
         repReply = true;
        } else if(repReply) {
          repReply = false;
          let thisPost = thisTarget.querySelector('.reply-div').style.display = 'none'; 
        }
       })

      })
    
    //Comment reply's reply reply hahaha😂😂😂
    let openReplyContents = comment.querySelectorAll('.send-reply');
    openReplyContents.forEach((openReplyContent)=>{
    openReplyContent.addEventListener('click', (e)=>{
      let thisTarget = e.target.parentElement.parentElement.parentElement.parentElement;
      let replyDiv = thisTarget.querySelector('.div-reply')
      let avatar = thisTarget.querySelector('.img-avatar')
      let username = thisTarget.querySelector('.commenters-name').innerHTML.slice(0,9);
      let reply = comment.querySelector('.post').value;
      let replyBlock = document.createElement('div');
      replyBlock.classList.add('commenters-comment');
      replyBlock.innerHTML = `
      <div class='flex-comment'>
      <img src="${avatar.src}" alt="commenter" class="img-avatar">
      <div class="commenters-name">${username}<p             
      class="date">2 minutes ago</p></div>
      </div>
      <p class="comment-content">${reply}</p>
      <div class="edited">(edited)</div>
      <div class="post-tools" id="comments-icons">
      <p class="like"><div class="fa fa-arrow-circle-up u-vote"id="upvote"></div> <span class="like-counter reply-like-counter">0</span></p>
      <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote"></div> <span class="dislike-counter reply-dislike-counter">0</span></p> 
      <div class="side-comment">
          <p class="delete-side-comment delete-reply-comment">delete</p>
          <p class="edit-side-comment edit-replied-comment">edit</p>
          <p class="edit-reply-comment comment-reply-reply">reply<span class="comments-number"></span></p>
          <p class="edit-report-comment report-reply-comment">report</p>
      </div>
      </div>
      <div class="div-reply reply-div">
      <div class="comment-text comment-menu">
      <textarea class="post this-textarea" placeholder="write a comment" rows="1"></textarea>
      <button class="link"><div class="fa fa-paperclip" id="link-it"></div></button>
      <button class="send send-reply"><div class="fa fa-share" id="do-comment"></div></button>
      </div>
      </div>
      `
      //Reply counter
      let length = comment.querySelectorAll('.commenters-comment')
      let commentNumbers = comment.querySelector('.comments-number').innerHTML = `(${length.length+1})`
      let appendDiv = thisTarget.querySelector('.div-reply')
      appendDiv.append(replyBlock)
    })
    })
  })
})

//Report comment functionality
comments.forEach((comment)=>{
  let report = comment.querySelector('.edit-report-comment');
  report.addEventListener('click', ()=>{
    let showReport = document.querySelector('.report-comment-modal').style.display = 'block';
    let postContainer = document.querySelector('.post-content');
    postContainer.style.filter = 'blur(1px)';

    //close modal
  let closeDelete = document.querySelector('#close-report-comment');
  closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let showReport = document.querySelector('.report-comment-modal').style.display = 'none';
  })
  })
})

//comments upvotes counter
comments.forEach((comment)=>{
  let commentupvotes = comment.querySelector('.like-counter')
  commentupvotes.addEventListener('click', ()=>{
    let showReport = document.querySelector('.upvote-modal').style.display = 'block';
    let postContainer = document.querySelector('.post-content');
    postContainer.style.filter = 'blur(1px)';
  
    //close modal
     let closeDelete = document.querySelector('#close-upvote-modal');
     closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let showReport = document.querySelector('.upvote-modal').style.display = 'none';
  })
  })
})

//comments downvotes counter
comments.forEach((comment)=>{
  let commentdownvotes = comment.querySelector('.dislike-counter')
  commentdownvotes.addEventListener('click', ()=>{
    let showReport = document.querySelector('.downvote-modal').style.display = 'block';
    let postContainer = document.querySelector('.post-content');
    postContainer.style.filter = 'blur(1px)';
  
    //close modal
     let closeDelete = document.querySelector('#close-downvote-modal');
     closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let showReport = document.querySelector('.downvote-modal').style.display = 'none';
  })
  })
})


var deleteThis = $('.delete-side-comment');
 deleteThis.on('click', function(e){
   deletePost(e)
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
    jQuery.ajax({
      url: `http://127.0.0.1:8000/thread/${thread_id}`,
      method: 'put',
      data:{
        title:inputName.value,
        content:textareaContent.value

      },
      success: function(data){
        if(data){
          postContent.innerHTML = data.title;
          threadName.innerHTML = data.content;
          let edited = document.querySelector('.edited').style.display = 'block'
          let editPost = document.querySelector('.edit-profile-element').style.display = 'none';
          postContainer.style.filter = 'blur(0px)';
        }
      },
      error: function(e){
          console.log(e);
          textareaContent.value=''
      }
    
    });

   
  })

  let closeEdit = document.querySelector('.close-menu');
  closeEdit.addEventListener('click', ()=>{
    let postContainer = document.querySelector('.post-content')
    let editPost = document.querySelector('.edit-profile-element').style.display = 'none';
    postContainer.style.filter = 'blur(0px)';
  })
}

function deleteThisPost(e){
  let deleteModal = document.querySelector('#delete-post').style.display = 'block';
  let postContainer = document.querySelector('.post-content')
  postContainer.style.filter = 'blur(1px)';
  let wholeBody  = document.querySelector('.post-content');

   //delete functionality 
   console.log(wholeBody);
  //close modal
  let closeDelete = document.querySelector('#close-menu');
  closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let deleteModal = document.querySelector('#delete-post').style.display = 'none';
  })

  let yesDelete = document.querySelector('.yes-delete');
  yesDelete.addEventListener('click', ()=>{
    window.location = '/'
  })

  let noDelete = document.querySelector('.no-delete');
  noDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let deleteModal = document.querySelector('#delete-post').style.display = 'none';
  })
}

//Comment delete post and edit post
function deletePost(e){
  let deleteModal = document.querySelector('.delete-comment').style.display = 'block';
  let postContainer = document.querySelector('.post-content');
  postContainer.style.filter = 'blur(1px)';

//delete functionality(
 let deleteComment = document.querySelector('.yes-delete-comment');
 deleteComment.addEventListener('click', ()=>{
       let removeComment = e.target.parentElement.parentElement.parentElement;
       removeComment.remove();
       postContainer.style.filter = 'blur(0px)';
      let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
 })

 let noDeleteComment = document.querySelector('.no-delete-comment')
 noDeleteComment.addEventListener('click', ()=>{
  postContainer.style.filter = 'blur(0px)';
  let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
 })

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

//Upvotes users
const likeCounter = document.querySelector('.this-counter');
likeCounter.addEventListener('click', ()=>{
  let showReport = document.querySelector('.upvote-modal').style.display = 'block';
  let postContainer = document.querySelector('.post-content');
  postContainer.style.filter = 'blur(1px)';

  //close modal
   let closeDelete = document.querySelector('#close-upvote-modal');
   closeDelete.addEventListener('click', ()=>{
  postContainer.style.filter = 'blur(0px)';
  let showReport = document.querySelector('.upvote-modal').style.display = 'none';
})
})

//Downvotes users
const dislikeCounter = document.querySelector('.this-dislike');
dislikeCounter.addEventListener('click', ()=>{
  let showReport = document.querySelector('.downvote-modal').style.display = 'block';
  let postContainer = document.querySelector('.post-content');
  postContainer.style.filter = 'blur(1px)';

  //close modal
   let closeDelete = document.querySelector('#close-downvote-modal');
   closeDelete.addEventListener('click', ()=>{
  postContainer.style.filter = 'blur(0px)';
  let showReport = document.querySelector('.downvote-modal').style.display = 'none';
})
})

const share = document.querySelector('#share');
share.addEventListener('click', ()=>{
  let showReport = document.querySelector('.share-modal').style.display = 'block';
  let postContainer = document.querySelector('.post-content');
  postContainer.style.filter = 'blur(1px)';

  //close modal
   let closeDelete = document.querySelector('#close-share-modal');
   closeDelete.addEventListener('click', ()=>{
  postContainer.style.filter = 'blur(0px)';
  let showReport = document.querySelector('.share-modal').style.display = 'none';
})
})

//Picture Upload
const imageUpload = document.querySelector('#image-upload');
const imagesContainer= document.querySelector('.box-image-holder');
imageUpload.addEventListener('change', function(){
  imagesContainer.style.display = 'block'
  let files = imageUpload.files;
  for(i of files){
    let reader = new FileReader();
    let figure = document.createElement("figure");
    let figCap = document.createElement("figcaption");
    figCap.innerText = '';
    figure.appendChild(figCap);

    reader.onload=()=>{
     let img = document.createElement('img');
     img.setAttribute("src",reader.result);
    img.classList.add('box')
     figure.insertBefore(img, figCap);
    }
    imagesContainer.appendChild(figure);
    reader.readAsDataURL(i)
  }
})