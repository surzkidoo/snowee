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
    imagesContainer.innerHTML = `${files.length} images added`
    reader.readAsDataURL(i);
  }
})

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
       
 let id= $('.follow-topic')[0].id
       formdata = new FormData()
      
       formdata.append('content',commentContent)
       formdata.append('reply_to_id',0);
       formdata.append('thread_id',id)

       let TotalFiles = imageUpload.files.length;
       //Total files
       let files = imageUpload.files;
       for (let i = 0; i < TotalFiles; i++) {
           formdata.append('files' + i, files[i]);
       }
       formdata.append('TotalFiles', TotalFiles);
      
      jQuery.ajax({
        url: "http://127.0.0.1:8000/post",
        method: 'post',
        cache:false,
        contentType: false,
        processData: false,
        data:formdata,
        success: function(data){
          if(data){
            console.log(data);
            commentTemplete([data.data],(newdata)=>{
              $(".comments-section").prepend(newdata);
          })
          upvoteCounter()
          downvoteCounter()
          upVoteHandle()
          downVoteHandle()
          handleReplyView()
          updateReply()
          handleReply()
          deleteReply()
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
    
     commentTemplete(data.data,(newdata)=>{
         $(".comments-section").append(newdata);
     })
     upvoteCounter()
     downvoteCounter()
     upVoteHandle()
     downVoteHandle()
     handleReplyView()
     updateReply()
     handleReply()
     deleteReply()
     initPagination(data.first_page_url.split('=')[0],2,'.comments-section',false,"comment")

    }
  },
  error: function(e){
    console.log(e);
}
  })
    

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
          postContent.innerHTML = data.content;
          threadName.innerHTML = data.title;
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
  //close modal
  let closeDelete = document.querySelector('#close-menu');
  closeDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let deleteModal = document.querySelector('#delete-post').style.display = 'none';
  })

  let yesDelete = document.querySelector('.yes-delete');
  yesDelete.addEventListener('click', ()=>{
    jQuery.ajax({
      url: `http://127.0.0.1:8000/thread/${thread_id}`,
      method: 'delete',
      success: function(data){
        if(data){
          window.location = '/'
        }
      },
      error: function(e){
          console.log(e);
          
      }
    
    });
   
  })

  let noDelete = document.querySelector('.no-delete');
  noDelete.addEventListener('click', ()=>{
    postContainer.style.filter = 'blur(0px)';
    let deleteModal = document.querySelector('#delete-post').style.display = 'none';
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
downvoteTopicCounter()
upvoteTopicCounter()

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

//Sorting
$("select").on('change',function(){
  
  console.log(this.selectedIndex)
  $(".comments").empty()
})

