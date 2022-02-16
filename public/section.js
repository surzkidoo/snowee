//declaring variable
const makePost = document.querySelector('.post-icon');
const mostViewed = document.querySelector('.most-viewed');
let postMain = document.querySelector('.post-main')
const mostViewedCards = postMain.querySelectorAll('.card');
const  updateTopic = document.querySelector('.update-topic');
let updateTopicSection = document.querySelector('.updated-topics');
const updateTopicCards = updateTopicSection.querySelectorAll('.card');
const  newTopicContent =document.querySelector('.new-topics-content');
const  newTopic =document.querySelector('.new-topic');
const newTopicCards = newTopicContent.querySelectorAll('.card');

updateTopicSection.style.display = 'none';
newTopicContent.style.display = 'none';

//add event listener for local storage 
 //document.addEventListener("DOMContentLoaded", showContent);



//check most view is empty
//most viewed options
mostViewed.addEventListener('click', ()=>{
    //get current class
    let current = document.querySelector('.current');
    // remove current class
    current.classList.remove('current');
    
    if(mostViewed.classList.contains('current')){
        mostViewed = mostViewed;
    } else{
        mostViewed.classList.add('current')
       let id= $('.section-name')[0].id
        jQuery.ajax({
          url: `http://127.0.0.1:8000/section/${id}/new`,
          method: 'get',
          success: function(data){
            if(data){
             const newdata =data.map(post=>{
                 return `
                 <div class="card">
                      <div class="image-head">
                         <img src="http://127.0.0.1:8000/${post.user.avatar}" alt="thumbnail">
                         <div class="username"><a href="profile.html" class="this">@${post.user.username} ${post.user.verified===1? '<div class="fa fa-check-circle" id="checked"></div>':''}</a><p class="details">originally posted in<a href="section/${post.section.name.toLowerCase()}">${post.section.name.toLowerCase()}</a></p></div>
                      </div>
                         <div class="content-box">
                         <h1>${post.title}</h1>
                         <p>${post.content}</p>
                         <div class="post-image">
                             ${post.image.length !=0 ? `<img src="http://127.0.0.1:8000/${post.image[0].url}" alt="image">`:""}
                         </div>
                         <div class="post-tools">
                              <p class="like"><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-${post.id}"></div> <span class="like-counter">${post.upvote_count}</span></p>
                              <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="thread_id-${post.id}"></div> <span class="dislike-counter">${post.downvote_count}</span></p> 
                              <p class="dislike"><div class="fa fa-comment"id="comment"></div> <span class="comment-counter">${post.posts_count}</span></p> 
                              <button class="see-more"><a href=${post.slug}>more...</a></button>      
                          </div>
                         </div>
                          </div>
                 `
             });
             $(".most-viewed-content").append(newdata);
             console.log(data)
             upVoteHandle()
             downVoteHandle()
                  }
          },
          error: function(e){
              console.log(e);
          }
        
        });
    }
    //hide other subs on click
    let mainPost = document.querySelector('.most-viewed-content').style.display = 'block';
    let updateTopicSection = document.querySelector('.updated-topics').style.display = 'none';
    newTopicContent.style.display = 'none';

    //adjust the height of make post;
    let makePostContainer = document.querySelector('.make-post')
    makePostContainer.style.top = '50%'
})

//updated topics
updateTopic.addEventListener('click', ()=>{
//get current class
  let current = document.querySelector('.current');
  // remove current class
  current.classList.remove('current');
  
  if(updateTopic.classList.contains('current')){
      updateTopic = updateTopic;
  } else{
      updateTopic.classList.add('current');
  }
  //hide other subs 
  newTopicContent.style.display = 'none'
  let mainPost = document.querySelector('.most-viewed-content').style.display = 'none';  
  // check if updated topics is empty
  if(updateTopicCards.length <= 0){
      let updateTopicNoContent =  document.querySelector('.update-no-content');
      updateTopicSection.style.display = 'block';
      updateTopicNoContent.innerHTML = 'no topics at the moment';
    } else{
      let updateTopicNoContent =  document.querySelector('.update-no-content');
     // updateTopicNoContent.innerHTML = '';
     updateTopicSection.style.display = 'block';
      updateTopicNoContent.style.display = 'none'
    } 
    
  //adjust the height of make post;
    let makePostContainer = document.querySelector('.make-post')
    makePostContainer.style.top = '50%'
})

//newTopic
newTopic.addEventListener('click', ()=>{
    //get current class
    const current = document.querySelector('.current');
    // remove current class
    current.classList.remove('current');
    
    if(newTopic.classList.contains('current')){
        newTopic = newTopic;
    } else{
        newTopic.classList.add('current');
    }
    //hide other section
    let mainPost = document.querySelector('.most-viewed-content').style.display = 'none';
    let updateTopicSection = document.querySelector('.updated-topics').style.display = 'none';
    // check if updated topics is empty
    if(newTopicCards.length <= 0){
     let newTopicNoContent =  document.querySelector('.new-topic-no-content');
     newTopicContent.style.display = 'block';
     newTopicNoContent.innerHTML = 'no topics at the moment';
    } else{
     let newTopicNoContent =  document.querySelector('.new-topic-no-content');
     newTopicContent.style.display = 'block';
     newTopicNoContent.style.display = 'none';
    }
    
  //adjust the height of make post;
    let makePostContainer = document.querySelector('.make-post');
     makePostContainer.style.top = '50%';
 })
//add event listener
makePost.addEventListener('click', ()=>{
   const getPost = document.querySelector('.make-post');
   const firstHeader = document.querySelector('.first-header');
   const section = document.querySelector('.section-button');
   const sectionContent = document.querySelector('.post-main');
   const updateTopicSection = document.querySelector('.updated-topics');
   const  newTopic = document.querySelector('.new-topic');
   const  newTopics = document.querySelector('.new-topics-content');
   sectionContent.style.filter = 'blur(1px)';
   firstHeader.style.filter = 'blur(1px)';
   section.style.filter = 'blur(1px)';
   updateTopicSection.style.filter = 'blur(1px)';
   newTopic.style.filter = 'blur(1px)';
   newTopics.style.filter = 'blur(1px)';
   getPost.style.display = 'block';
  })

   //close post
   const closePost = document.querySelector('.close-post');
    closePost.addEventListener('click', ()=>{
    const getPost = document.querySelector('.make-post');
    const firstHeader = document.querySelector('.first-header');
    const updateTopicSection = document.querySelector('.updated-topics');
    const section = document.querySelector('.section-button');
    const sectionContent = document.querySelector('.post-main');
    const  newTopic = document.querySelector('.new-topic');
    const  newTopics = document.querySelector('.new-topics-content');
    sectionContent.style.filter = 'none';
    newTopics.style.filter = 'none';
    firstHeader.style.filter = 'none';
    section.style.filter = 'none';
    updateTopicSection.style.filter = 'none';
    newTopic.style.filter = 'none'
    getPost.style.display = 'none';
    })

    //checking for charcters count
    const contentCount = document.querySelector('#heading-content');
    contentCount.addEventListener('keydown', (e)=>{
    //console.log(contentCount);
      if(contentCount.value.split(' ').length >= 245){
        contentCount.style.border = '5px solid red'
        alert('you have reached the max for now, press "post" to make a post');
      }
    })
 
    //creating the send functionality
  const send = document.querySelector('.new-post');
  send.addEventListener('click', ()=>{
     //getting inputed values;
     let headerInput = document.querySelector('#heading-header').value;
     let contentValue = document.querySelector('#heading-content').value;
       //check if input is empty
     if(contentValue.length === 0  || headerInput.length === 0){
      let headerInput = document.querySelector('#heading-header');
      headerInput.style.border = '2.5px solid red';
      headerInput.placeholder = 'please input header';

      let contentValue = document.querySelector('#heading-content');
      contentValue.style.border = '2.5px solid red'
      contentValue.placeholder = 'please input some contents'
     }else{



        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
          jQuery.ajax({
            url: "http://127.0.0.1:8000/thread",
            method: 'post',
            data: {
                section_id: $('.section-name')[0].id,
                title:  headerInput,
                content:contentValue,
          
            },
            success: function(data){
             console.log(data)
            },
            error: function(e){
  
              
                console.log(e);
            }
          
          });





        let header = document.querySelector('#heading-header');
        header.style.border = 'none';
    
        let content = document.querySelector('#heading-content');
        content.style.border = 'none';
      //changing the current class to 'new topic' section
      const newTopicMenu = document.querySelector('.new-topic');
      const current = document.querySelector('.current');
      newTopicContent.style.display = 'block';
       //hide other section
     let mainPost = document.querySelector('.post-main').style.display = 'none';
     let updateTopicSection = document.querySelector('.updated-topics').style.display = 'none';
      current.classList.remove('current');
      if(newTopicMenu.classList.contains('current')){
          newTopicMenu= newTopicMenu;
      } else{
          newTopicMenu.classList.add('current')
      };
    //getting element to append   
      const newTopic = document.querySelector('.new-topics-content');
      let msg = document.querySelector('.new-topic-no-content');
      let username =  document.querySelector('.username').innerHTML;
      let avatar = document.querySelector('.avatar').src;
      let spaceName = document.querySelector('.section-name');
      

    
 
    

   
    
   

    //clearing input field
    headerInput = '';
    contentValue = '';
    //closing up of post modal
    const getPost = document.querySelector('.make-post');
    const firstHeader = document.querySelector('.first-header');
    const updateTopicfilter = document.querySelector('.updated-topics');
    const section = document.querySelector('.section-button');
    const sectionContent = document.querySelector('.post-main');
    const  newTopicfilter = document.querySelector('.new-topic');
    const  newTopics = document.querySelector('.new-topics-content');
    sectionContent.style.filter = 'none';
    newTopics.style.filter = 'none';
    firstHeader.style.filter = 'none';
    section.style.filter = 'none';
    updateTopicfilter.style.filter = 'none';
    newTopicfilter.style.filter = 'none'
    getPost.style.display = 'none';
    }
 })
 
//check is mostviewed section is empty
if(mostViewedCards.length <= 0){
    let messageDisplay = document.querySelector('.no-content-display');
    messageDisplay.innerHTML = 'no topics at the moment'
    //let updateTopicNoContent =  document.querySelector('.update-no-content').style.display = 'none';
} else {
    let messageDisplay = document.querySelector('.no-content-display');
    messageDisplay.innerHTML = '';
    //let updateTopicNoContent =  document.querySelector('.update-no-content').style.display = 'none';
}

//Post Header Emoji
window.addEventListener('DOMContentLoaded', () => {
  EmojiButton(document.querySelector('.heading-emoji'), function (emoji) {
   document.querySelector('.heading-header').value += emoji;
   });
 });

 //Text content emoji
 window.addEventListener('DOMContentLoaded', () => {
  EmojiButton(document.querySelector('.text-content-emoji-icon'), function (emoji) {
   document.querySelector('.text-content-emoji').value += emoji;
   });
 });














