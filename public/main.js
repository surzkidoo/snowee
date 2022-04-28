
//menu toggler function
const toggleMenu = document.querySelector(".profile-up");
const userid=parseInt($('#id').attr('loggin-id'));
const pageNum=4;
/* toggling functionality */
let togglebool = true;
toggleMenu && toggleMenu.addEventListener("click", () => {
   if(togglebool){
    var toggleItem = document.querySelector(".collapsible-menu");
    toggleItem.style.display= 'block';
    togglebool = false;
   } else {
       var toggleItem = document.querySelector(".collapsible-menu");
       toggleItem.style.display= 'none';
        togglebool = true;
   }


   window.onclick = function(event) {
    if (!event.target.matches('.profile-up')) {
      var dropdowns = document.getElementsByClassName("collapsible-menu");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display = 'block') {
          openDropdown.style.display = 'none';
          togglebool = true
        }
      }
    }
  }
    
});
$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
  }
});

const upVoteHandle = () => {
    const upVote = document.querySelectorAll(".u-vote");
   upVote && upVote.forEach((upvotes) => {
        $(upvotes)
            .off("click")
            .on("click", (e) => {
                let thread_id = $(upvotes).attr("upid");
                thread_id = thread_id.split("-");
                jQuery.ajax({
                    url: "http://127.0.0.1:8000/upvote",
                    method: "post",
                    data: {
                        [thread_id[0]]: thread_id[1],
                    },
                    success: function (data) {
                        console.log(data);
                        $(upvotes).next().text(data.upvote_count);
                        data.insert && $(upvotes).next().next().next().next().next().text(data.downvote_count);
                    },
                    error: function (e) {
                        console.log(e);
                    },
                });
                //
                let add = document.querySelector(".add");
                upvotes.classList.toggle("add");
            });
    });
};

const downVoteHandle = () => {
    const upVote = document.querySelectorAll(".d-vote");
   upVote && upVote.forEach((downvotes) => {
        $(downvotes)
            .off("click")
            .on("click", (e) => {
                let thread_id = $(downvotes).attr("upid");
                thread_id = thread_id.split("-");
                jQuery.ajax({
                    url: "http://127.0.0.1:8000/downvote",
                    method: "post",
                    data: {
                        [thread_id[0]]: thread_id[1],
                    },
                    success: function (data) {
                        $(downvotes).next().text(data.downvote_count);
                        data.insert && $(downvotes).prev().prev().prev().prev().next().text(data.upvote_count);
                    },
                    error: function (e) {
                        console.log(e);
                    },
                });
                //
                let add = document.querySelector(".add");
                downvotes.classList.toggle("add");
            });
    });

};

function upvoteCounter(){

    //comments upvotes counter
let comments = document.querySelectorAll(".comments");
comments.forEach((comment)=>{
    let commentupvotes = comment.querySelector('.like-counter')
    $(commentupvotes).off("click").on('click', ()=>{
      let vdata=$(commentupvotes).prev().attr('upid');
      let type=vdata.split('_')[0];
      let id = vdata.split('-')[1];
      
      let showReport = document.querySelector('.upvote-modal').style.display = 'block';
      let postContainer = document.querySelector('.body');
      postContainer.style.filter = 'blur(1px)';
      //ajax call to get the upvote user
      jQuery.ajax({
        url: `http://127.0.0.1:8000/upvote/${type}/${id}`,
        method: 'get',
        success: function(response){
          data=response.data
          if(data){
            console.log(data)
           const newdata = data.map((user)=>{
             return `
             <li class="upvote-card">
             <img src="http://127.0.0.1:8000/${user.avatar}" alt="img">
             <div><strong>@${userid!=user.id?user.username:"You"}</strong></div>
             </li>
             `
           })
           $('#upvote-container').append(newdata);
          
          }
        },
        error: function(e){
            console.log(e);
        }
      
      });
  
      //close modal
       let closeDelete = document.querySelector('#close-upvote-modal');
       closeDelete.addEventListener('click', ()=>{
      postContainer.style.filter = 'blur(0px)';
      $('#upvote-container').empty()
      let showReport = document.querySelector('.upvote-modal').style.display = 'none';
    })
    })
  })
  
}
function downvoteTopicCounter(){
  const dislikeCounter = document.querySelectorAll('.this-dislike');
  dislikeCounter.forEach((downvotes)=>{
    $(downvotes).off("click").on('click', ()=>{
      let vdata=$(downvotes).prev().attr('upid');
      let type=vdata.split('_')[0];
      let id = vdata.split('-')[1];
      document.querySelector('.downvote-modal').style.display = 'block';
      let postContainer = document.querySelector('.body');
      postContainer.style.filter = 'blur(1px)';

      jQuery.ajax({
        url: `http://127.0.0.1:8000/downvote/${type}/${id}`,
        method: 'get',
        success: function(response){
          data=response.data
          if(data){
            console.log(data)
           const newdata = data.map((user)=>{
             return `
             <li class="upvote-card">
             <img src="http://127.0.0.1:8000/${user.avatar}" alt="img">
                 <div><strong>@${userid!=user.id?user.username:"You"}</strong></div>
             </li>
             `
           })
           $('#downvote-container').append(newdata);
          
          }
        },
        error: function(e){
            console.log(e);
        }
      
      });
      let closeDelete = document.querySelector('#close-downvote-modal');
       closeDelete.addEventListener('click', ()=>{
      postContainer.style.filter = 'blur(0px)';
      $('#downvote-container').empty()
      document.querySelector('.downvote-modal').style.display = 'none';
    })
    
  })
})
}

function upvoteTopicCounter(){
  const dislikeCounter = document.querySelectorAll('.this-counter');
  dislikeCounter.forEach((downvotes)=>{
    $(downvotes).off("click").on('click', ()=>{
      let vdata=$(downvotes).prev().attr('upid');
      let type=vdata.split('_')[0];
      let id = vdata.split('-')[1];
      document.querySelector('.upvote-modal').style.display = 'block';
      let postContainer = document.querySelector('.body');
      postContainer.style.filter = 'blur(1px)';

      jQuery.ajax({
        url: `http://127.0.0.1:8000/upvote/${type}/${id}`,
        method: 'get',
        success: function(response){
          data=response.data
          if(data){
            console.log(data)
           const newdata = data.map((user)=>{
             return `
             <li class="upvote-card">
             <img src="http://127.0.0.1:8000/${user.avatar}" alt="img">
             <div><strong>@${userid!=user.id?user.username:"You"}</strong></div>
             </li>
             `
           })
           $('#upvote-container').append(newdata);
          
          }
        },
        error: function(e){
            console.log(e);
        }
      
      });
      let closeDelete = document.querySelector('#close-upvote-modal');
       closeDelete.addEventListener('click', ()=>{
      postContainer.style.filter = 'blur(0px)';
      $('#upvote-container').empty()
      document.querySelector('.upvote-modal').style.display = 'none';
    })
    
  })
})
}


function downvoteCounter(){
    //comments downvotes counter
let comments = document.querySelectorAll(".comments");
comments.forEach((comment)=>{
    let commentdownnvotes = comment.querySelector('.dislike-counter')
    $(commentdownnvotes).off("click").on('click', ()=>{
      let vdata=$(commentdownnvotes).prev().attr('upid');
      let type=vdata.split('_')[0];
      let id = vdata.split('-')[1];
      
      document.querySelector('.downvote-modal').style.display = 'block';
      let postContainer = document.querySelector('.body');
      postContainer.style.filter = 'blur(1px)';
      //ajax call to get the downvote user
      jQuery.ajax({
        url: `http://127.0.0.1:8000/downvote/${type}/${id}`,
        method: 'get',
        success: function(response){
          data=response.data
          if(data){
            console.log(data)
           const newdata = data.map((user)=>{
             return `
             <li class="upvote-card">
             <img src="http://127.0.0.1:8000/${user.avatar}" alt="img">
             <div><strong>@${userid!=user.id?user.username:"You"}</strong></div>
             </li>
             `
           })
           $('#downvote-container').append(newdata);
          
          }
        },
        error: function(e){
            console.log(e);
        }
      
      });
  
      //close modal
       let closeDelete = document.querySelector('#close-downvote-modal');
       closeDelete.addEventListener('click', ()=>{
      postContainer.style.filter = 'blur(0px)';
      $('#downvote-container').empty()
      let showReport = document.querySelector('.downvote-modal').style.display = 'none';
    })
    })
  })
  
}

function deletePost(e){

    let deleteModal = document.querySelector('.delete-comment').style.display = 'block';
    let postContainer = document.querySelector('.post-content');
    postContainer.style.filter = 'blur(1px)';
  
  //delete functionality(
   let deleteComment = document.querySelector('.yes-delete-comment');
   deleteComment.addEventListener('click', ()=>{
      
         let removeComment = e.target.parentElement.parentElement.parentElement;
         jQuery.ajax({
            url: `http://127.0.0.1:8000/post/${removeComment.id}`,
            method: "delete",
            success: function (data) {
              console.log(data)
                if (data) {
                    
                }
            },
            error: function (e) {
                console.log(e);
            },
        });
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


function updateReply(){
    
    const comments = document.querySelectorAll('.comments');
    comments.forEach((comment)=>{
      let commentDelete = comment.querySelector('.edit-side-comment');
      commentDelete && commentDelete.addEventListener('click', (e)=>{
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

 
  
  
}

function handleReplyView(){
      //reply functionality
      const comments = document.querySelectorAll('.comments');
comments.forEach((comment)=>{
    let openReply = false;
      let reply = comment.querySelector('.edit-reply-comment');
      $(reply).off('click').on('click', (e)=>{
        let replyDiv = comment.querySelector('.div-reply');
        if(!openReply){
          
            let commenters= replyDiv.querySelectorAll('.commenters-comment')
            commenters.forEach((c)=>c.remove())
         jQuery.ajax({
            url: `http://127.0.0.1:8000/post/reply/${comment.id}`,
            method: 'get',
            success: function(data){
                console.log(data)
              if(data){
              commentTemplete(data,(newdata,container)=>{
                
                $(container).append(newdata);
              
              },type="'comments commenters-comment'",replyDiv)
              upVoteHandle()
              updateReply()
              downVoteHandle()
              upvoteCounter()
             downvoteCounter()
             deleteReply()
             !userid && handleLogin()
             comment.querySelector('.div-reply').style.display = 'block';
              // initPaginationHalve(data.first_page_url.split('=')[0],2,replyDiv,false,"reply-comment")
              }
            },
            error: function(e){
                console.log(e);
            }
          
          });



          openReply = true;
        } else if(openReply) {
         
         
          let thisPost = comment.querySelector('.div-reply').style.display = 'none';
            let commenters= replyDiv.querySelectorAll('.commenters-comment')
            commenters.forEach((c)=>c.remove())
            openReply = false; 
          console.log(thisPost); 
        }
      })
    })
}
function deleteReply(){
    var deleteThis = $('.delete-side-comment');
 deleteThis.off('click').on('click', function(e){
    
   deletePost(e)
 })

}
function topicTemplete(data, callback) {
    const newdata = data.map((post) => {
        return `
    <div class="card">
         <div class="image-head">
            <img src="http://127.0.0.1:8000/${post.user.avatar}" alt="thumbnail">
            <div class="username"><a href="http://127.0.0.1:8000/user/${post.user.username}" class="this">@${
                post.user.username
            } ${
            post.user.verified === 1
                ? '<div class="fa fa-check-circle" id="checked"></div>'
                : ""
        }</a><p class="details">originally posted in<a href="http://127.0.0.1:8000/section/${post.section.name.toLowerCase()}">${
            post.section.name.toLowerCase()
        }</a></p></div>
         </div>
            <div class="content-box">
            <h1>${post.title}</h1>
            <p>${post.content}</p>
            <div class="post-image">
                ${
                    post.image.length != 0
                        ? `<img src="http://127.0.0.1:8000/${post.image[0].url}" alt="image">`
                        : ""
                }
            </div>
            <div class="post-tools">
                 <p class="like"><div class="fa fa-arrow-circle-up  ${userid? 'u-vote': 'login-to-action'}" id="upvote" upid="thread_id-${
                     post.id
                 }"></div> <span class="like-counter this-counter">${
            post.upvote_count
        }</span></p>
                 <p class="dislike"><div class="fa fa-arrow-circle-down ${userid? 'd-vote': 'login-to-action'}"id="downvote" upid="thread_id-${
                     post.id
                 }"></div> <span class="dislike-counter this-dislike">${
            post.downvote_count
        }</span></p> 
                 <p class="dislike"><div class="fa fa-comment"id="comment"></div> <span class="comment-counter">${
                     post.posts_count
                 }</span></p> 
                 <button class="see-more"><a class="fa fa-ellipsis-h" href=http://127.0.0.1:8000/${
                     post.slug
                 }></a></button>
            </div>
             </div>
    `;
    });
    return callback(newdata);
}
//Commet Templete 
function commentTemplete(data, callback, type="comments",container="") {
    const newdata = data.map(post=>{
        return`
        <div class=${type}  id="${post.id}">
        <div class='flex-comment'>
        <img src="http://127.0.0.1:8000/${post.user.avatar}" alt="commenter" class="img-avatar">
        <div class="commenters-name">@${post.user.username}<p             
        class="date">${post.created_at}</p></div>
        </div>
        <p class="comment-content">${post.content}</p>
        <div class='post-image' >
        ${
          post.image.map(image=>`<img  src='http://127.0.0.1:8000/${image.url}' />`)
          }
        </div>
        <div class="edited">(edited)</div>
        <div class="post-tools" id="comments-icons">
        <p class="like"><div class="fa fa-arrow-circle-up ${userid? 'u-vote': 'login-to-action'} "id="upvote" upid="post_id-${post.id}"></div> <span class="like-counter">${post.upvote_count}</span></p>
        <p class="dislike"><div class="fa fa-arrow-circle-down ${userid? 'd-vote': 'login-to-action'}" id="downvote" upid="post_id-${post.id}"></div> <span class="dislike-counter">${post.downvote_count}</span></p> 
        <div class="side-comment">
        ${userid==post.user.id ? '<p><div class="fa fa-trash-alt delete-side-comment"></div></p>':''}
        ${userid==post.user.id ? '<p><div class="fa fa-edit edit-side-comment"></div></p>': ''} 
            <p><div class="fa fa-reply edit-reply-comment"></div><span class="comments-number"> ${post.reply_count > 0? `(${post.reply_count})` : '' } </span></p>
            <p><div class="fa fa-exclamation-triangle edit-report-comment"></div></p>
        </div>
        </div>
        <div class="div-reply">
        <div class="comment-text comment-menu">
        <textarea class="this-textarea" placeholder="write a comment" rows="1"></textarea>
        <button class="link"><div class="comment-emoji" id="link-it"></div></button>
        <button class="link"><div class="fa fa-paperclip link-it" id="link-it"><input type="file" id="image-upload"  class="fa fa-paperclip" multiple></div></button>
        <button class="sendbtn ${userid?  'send': 'login-to-action'}"><div class="fa fa-share" id="do-comment"></div></button>
        </div>
        <div class="box-image-holder">        
        </div>
        </div>
        </div>
          `
      ;
      })
    return callback(newdata,container);
}


    function notificationTemplete(data,callback,container) {
      const newdata = data.map((noti)=>{
      return `
      <div class="notifis-head">
      <img src="${noti.user_invoker.avatar}" alt="">
      <p><strong>@${noti.user_invoker.username}</strong> ${noti.message}</p>
      </div>
      `
  })
  return callback(newdata,container);
}
function handleImage (){
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
}


//scroll


function initPagination(url, page = 2, container, loading = false,type,label=null) {

    $(window).scroll(function () {
        if (
            $(window).scrollTop() + $(window).height() >=
                $(document).height() &&
            !loading && $(`#more-${label || type}`).text()!="No More"
        ) { 
           
          $(container).append(`<div id='more-${label || type}' class='load-action-${label || type}'>View More</div>`)
            loading = true;
            $(`.load-action-${label || type}`).on('click',function(){

            infinteLoadMore(page, url, container,type,label);
            loading = false;
            page++;
            
            });
        }
    });
}

//  function  initPaginationHalve(url, page = 2, container, loading = false,type){

//     $(container).append(`<div id='more-${type}' class='load-action-${type}'>View More</div>`)
//     loading = true;
//     $(`.load-action-${type}`).on('click',function(){
//     alert("what the fuck")
//     infinteLoadMore(page, url, container,type,true,()=>{
//        initPaginationHalve(url,page,container,loading=false,type)
//     });
//     loading = false;
//     page++;
  
//     });

// }


 function infinteLoadMore(page, url, container,type,label) {
   let typee=type;
    jQuery.ajax({
        url: `${url}=${page}`,
        method: "get",

        success: function (data) {
          
            if (data) {
                console.log(data)
                if (data.data.length==0) {
                    $(`#more-${label || type}`).text("No More")
                    return
                }
                if(type=="topic"){
                    topicTemplete(data.data, (newdata) => {
                      $(`#more-${label || type}`).remove()
                    $(container).append(newdata);
                });

                upVoteHandle();
                downVoteHandle();
                   upvoteTopicCounter()
                downvoteTopicCounter()
             
                
                }
                else if(type=="comment"){
                    commentTemplete(data.data, (newdata) => {
                      $(`#more-${label || typee}`).remove()
                        $(container).append(newdata)
                    })
                    upvoteCounter()
                    downvoteCounter()
                    upVoteHandle()
                    downVoteHandle()
                    handleReplyView()
                    updateReply()
                    handleReply()
                    deleteReply()
                }
                else if(type=="reply-comment"){
                  commentTemplete(data.data, (newdata) => {
                    $(`#more-${label || typee}`).remove()
                      $(container).append(newdata)
                  },type="'comments commenters-comment'")
                  upvoteCounter()
                  downvoteCounter()
                  upVoteHandle()
                  downVoteHandle()
                  handleReplyView()
                  updateReply()
                  handleReply()
                  deleteReply()
                }
                if(type=="noti"){
                  notificationTemplete(data.data, (newdata) => {
                    $(`#more-${label || type}`).remove()
                    $(container).append(newdata)
                  } )
                }
                else{
                  $(container).append(data);
                }
                // halve && callback();
                
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}




function report(){
    let comments = document.querySelectorAll('.comments');
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
  
  
}
  function handleReply(){
  let comments = document.querySelectorAll('.comments');

  

//Reply thread functionality
comments.forEach((comment)=>{

  let makeComment = comment.querySelector('.send');
  makeComment && makeComment.addEventListener('click', (e)=>{
    let replyDiv = comment.querySelector('.div-reply')
    let replyElement = comment.querySelector('.this-textarea');
    log
    jQuery.ajax({
        url: "http://127.0.0.1:8000/post",
        method: 'post',
        data:{
          thread_id:$('.thread-title')[0].id,
          content:replyElement.value,
          reply_to_id:comment.id

        },
        success: function(data){
          if(data){
            console.log(data);
            commentTemplete([data.data],(newdata,container)=>{
              $(container).append(newdata);
          },type="'comments commenters-comment'",replyDiv)
          
          comment.querySelector('.comments-number').innerHTML = data.replycount
          replyElement.value="";
          upvoteCounter()
          downvoteCounter()
          upVoteHandle()
          downVoteHandle()
          updateReply()
          deleteReply()
           console.log(data)
          }
        },
        error: function(e){
            console.log(e);
        }
      
      });
    
   
//     //Delete Reply
//     let replyDeletes = comment.querySelectorAll('.delete-reply-comment');
//     replyDeletes.forEach((replyDelete)=>{
//       replyDelete.addEventListener('click',(e)=>{
//         let deleteModal = document.querySelector('.delete-comment').style.display = 'block';
//         let postContainer = document.querySelector('.post-content');
//         postContainer.style.filter = 'blur(1px)';
//         //delete functionality
//         let deleteThis = document.querySelector('.yes-reply-comment');
//         deleteThis.addEventListener('click', ()=>{
//           let deleteReply = e.target.parentElement.parentElement.parentElement;
//           deleteReply.remove();
//           postContainer.style.filter = 'blur(0px)';
//           let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
//         })
//         let noDeleteThis = document.querySelector('.no-reply-comment');
//         noDeleteThis.addEventListener('click', ()=>{
//           postContainer.style.filter = 'blur(0px)';
//           let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
//         })
//         //close modal
//         let closeDelete = document.querySelector('.close-comment');
//         closeDelete.addEventListener('click', ()=>{
//           postContainer.style.filter = 'blur(0px)';
//           let deleteModal = document.querySelector('.delete-comment').style.display = 'none';
//         })
//        })
//     })
   
    
//   //Edit Reply
//      let commentDeletes = comment.querySelectorAll('.edit-replied-comment');
//      commentDeletes.forEach((commentDelete)=>{
//       commentDelete.addEventListener('click', (e)=>{
//       let editComment = document.querySelector('.edit-comment').style.display = 'block';
//        let target = e.target.parentElement.parentElement.parentElement;
//       let inputName = target.querySelector('.comment-content').innerHTML;
  
//      let postContainer = document.querySelector('.post-content');
//      let textareaContent = document.querySelector('.comment-textarea');
//      textareaContent.value = inputName;
//      postContainer.style.filter = 'blur(1px)';

//      let updateComment = document.querySelector('.update-comment');
//      updateComment.addEventListener('click', ()=>{
//       let textareaContent = document.querySelector('.comment-textarea');
//       let inputName = target.querySelector('.comment-content');
//       inputName.innerHTML = textareaContent.value
//       let editComment = document.querySelector('.edit-comment').style.display = 'none';
//       let postContainer = document.querySelector('.post-content');
//       let edited = target.querySelector('.edited').style.display = 'block'
//       postContainer.style.filter = 'blur(0px)';
//      })
//      let closeEdit = document.querySelector('#close-edit-menu');
//      closeEdit.addEventListener('click', ()=>{
//        postContainer.style.filter = 'blur(0px)';
//        let editComment = document.querySelector('.edit-comment').style.display = 'none';
//      })
//    })
//    })
 
//    //Report funtionality
//     let reportReplies = comment.querySelectorAll('.report-reply-comment');
//     reportReplies.forEach((reportReply)=>{
//        reportReply.addEventListener('click', ()=>{
//       let showReport = document.querySelector('.report-comment-modal').style.display = 'block';
//       let postContainer = document.querySelector('.post-content');
//       postContainer.style.filter = 'blur(1px)';
  
//       //close modal
//     let closeDelete = document.querySelector('#close-report-comment');
//     closeDelete.addEventListener('click', ()=>{
//       postContainer.style.filter = 'blur(0px)';
//       let showReport = document.querySelector('.report-comment-modal').style.display = 'none';
//     })
//     })
//     })

//   //reply upvote counter
//     let likeCounters = comment.querySelectorAll('.reply-like-counter');
//     likeCounters.forEach((likeCounter)=>{
//       likeCounter.addEventListener('click', ()=>{
//       let showReport = document.querySelector('.upvote-modal').style.display = 'block';
//       let postContainer = document.querySelector('.post-content');
//       postContainer.style.filter = 'blur(1px)';
    
//       //close modal
//        let closeDelete = document.querySelector('#close-upvote-modal');
//        closeDelete.addEventListener('click', ()=>{
//       postContainer.style.filter = 'blur(0px)';
//       let showReport = document.querySelector('.upvote-modal').style.display = 'none';
//      })
//      })
//     })
      
//     //reply downvote counter
//      let dislikeCounters = comment.querySelectorAll('.reply-dislike-counter');
//      dislikeCounters.forEach((dislikeCounter)=>{
//         dislikeCounter.addEventListener('click', ()=>{
//       let showReport = document.querySelector('.downvote-modal').style.display = 'block';
//       let postContainer = document.querySelector('.post-content');
//       postContainer.style.filter = 'blur(1px)';
    
//       //close modal
//        let closeDelete = document.querySelector('#close-downvote-modal');
//        closeDelete.addEventListener('click', ()=>{
//       postContainer.style.filter = 'blur(0px)';
//       let showReport = document.querySelector('.downvote-modal').style.display = 'none';
//     })
//      })
//      })

//     //Comment reply's reply😂😂😂
//      let replyReplies = comment.querySelectorAll('.comment-reply-reply')
//      replyReplies.forEach((replyReply)=>{
//         let repReply = false;
//     replyReply.addEventListener('click', (e)=>{
//       let thisTarget = e.target.parentElement.parentElement.parentElement;
//         if(!repReply){
//           let replyDiv = thisTarget.querySelector('.reply-div');
//          replyDiv.style.display = "block";
//          repReply = true;
//         } else if(repReply) {
//           repReply = false;
//           let thisPost = thisTarget.querySelector('.reply-div').style.display = 'none'; 
//         }
//        })

//       })
    
//     //Comment reply's reply reply hahaha😂😂😂
//     let openReplyContents = comment.querySelectorAll('.send-reply');
//     openReplyContents.forEach((openReplyContent)=>{
//     openReplyContent.addEventListener('click', (e)=>{
//       let thisTarget = e.target.parentElement.parentElement.parentElement.parentElement;
//       let replyDiv = thisTarget.querySelector('.div-reply')
//       let avatar = thisTarget.querySelector('.img-avatar')
//       let username = thisTarget.querySelector('.commenters-name').innerHTML.slice(0,9);
//       let reply = comment.querySelector('.post').value;
//       let replyBlock = document.createElement('div');
//       replyBlock.classList.add('commenters-comment');
//       replyBlock.innerHTML = `
//       <div class='flex-comment'>
//       <img src="${avatar.src}" alt="commenter" class="img-avatar">
//       <div class="commenters-name">${username}<p             
//       class="date">2 minutes ago</p></div>
//       </div>
//       <p class="comment-content">${reply}</p>
//       <div class="edited">(edited)</div>
//       <div class="post-tools" id="comments-icons">
//       <p class="like"><div class="fa fa-arrow-circle-up u-vote"id="upvote"></div> <span class="like-counter reply-like-counter">0</span></p>
//       <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote"></div> <span class="dislike-counter reply-dislike-counter">0</span></p> 
//       <div class="side-comment">
//           <p class="delete-side-comment delete-reply-comment">delete</p>
//           <p class="edit-side-comment edit-replied-comment">edit</p>
//           <p class="edit-reply-comment comment-reply-reply">reply<span class="comments-number"></span></p>
//           <p class="edit-report-comment report-reply-comment">report</p>
//       </div>
//       </div>
//       <div class="div-reply reply-div">
//       <div class="comment-text comment-menu">
//       <textarea class="post this-textarea" placeholder="write a comment" rows="1"></textarea>
//       <button class="link"><div class="fa fa-paperclip" id="link-it"></div></button>
//       <button class="send send-reply"><div class="fa fa-share" id="do-comment"></div></button>
//       </div>
//       </div>
//       `
//       //Reply counter
//       let length = comment.querySelectorAll('.commenters-comment')
//       let commentNumbers = comment.querySelector('.comments-number').innerHTML = `(${length.length+1})`
//       let appendDiv = thisTarget.querySelector('.div-reply')
//       appendDiv.append(replyBlock)
//     })
//     })
 })
})
 }

 function handleLogin(){
  $('.login-to-action').off('click').on('click',()=>{
    alert('please login to perform this task')
  })
}

//Notificaation RealTime


