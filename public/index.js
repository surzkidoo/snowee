//Downvote
const downVote = document.querySelectorAll('.dislike');
 downVote.forEach((downvotes)=>{
     let p = document.querySelector('.dislike-counter');
    let counter = 0;
    let hasClicked = false;
   downvotes.addEventListener('click', (e)=>{
       let downvote = e.target;
       if(!hasClicked){
        counter++
        hasClicked = true;
        let voteCounter = downvote.querySelector('.dislike-counter');
        voteCounter.innerHTML = counter;
       } else if(hasClicked){
           counter = 0;
            hasClicked = false;
            let voteCounter = downvote.querySelector('.dislike-counter');
            voteCounter.innerHTML = counter;
        }
       let add = document.querySelector('.add')
       downvotes.classList.toggle('add')
   }) 
 })

//popular page 

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
    }
});

  jQuery.ajax({
    url: "http://127.0.0.1:8000/popular",
    method: 'get',

    success: function(data){
      if(data){
          console.log(data)
       const newdata =data.data.map(post=>{
           return `
           <div class="card">
                <div class="image-head">
                   <img src="${post.user.avatar}" alt="thumbnail">
                   <div class="username"><a href="profile.html" class="this">@${post.user.username} ${post.user.verified===1? '<div class="fa fa-check-circle" id="checked"></div>':''}</a><p class="details">originally posted in<a href="section/${post.section.name.toLowerCase()}">${post.section.name.toLowerCase()}</a></p></div>
                </div>
                   <div class="content-box">
                   <h1>${post.title}</h1>
                   <p>${post.content}</p>
                   <div class="post-image">
                       ${post.image.length !=0 ? `<img src="${post.image[0].url}" alt="image">`:""}
                   </div>
                   <div class="post-tools">
                        <p class="like"><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-${post.id}"></div> <span class="like-counter">${post.upvote_count}</span></p>
                        <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="thread_id-${post.id}"></div> <span class="dislike-counter">${post.downvote_count}</span></p> 
                        <p class="dislike"><div class="fa fa-comment"id="comment"></div> <span class="comment-counter">${post.posts_count}</span></p> 
                        <button class="see-more"><a href=${post.slug}><span class="fa fa-ellipsis-h elipse"></span></a></button>
                   </div>
                    </div>
           `
       });
       $(".container-home").append(newdata);
        upVoteHandle()
        downVoteHandle()
       initPagination(data.first_page_url.split('=')[0],2,'.container-home',false,"topic")
     
    }
    },
    error: function(e){
        console.log(e);
    }
  
  });

//Handle upvote



const popular = document.querySelector('.first-second-header');
const personalized = document.querySelector('.second-second-header');

popular.addEventListener('click', (e)=>{
    e.preventDefault();
    
    const active = document.querySelector('.active');

    active.classList.remove('active');

    if(popular.classList.contains('active')){
        popular = popular;
    } else{
        popular.classList.add('active')
    }
    const cardArray = document.querySelector('.container-home').style.display = 'block';
    const personalizedContainer = document.querySelector('.personalized-container').style.display = 'none'
})

//personalized page
personalized.addEventListener('click', (e)=>{
    e.preventDefault();
    
    const active = document.querySelector('.active')

    active.classList.remove('active');

    if(personalized.classList.contains('active')){
        personalized = personalized;
    } else{
        personalized.classList.add('active')
    }

    const card = document.querySelector('.container-home').style.display = 'none';
    const personalizedContainer = document.querySelector('.personalized-container').style.display = 'block'

})

//Creating the personalized contents

const personalizedContainer = document.querySelector('.personalized-container');

    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const paragraphContainer = document.createElement('p');
    const li2 = document.createElement('li');
    const paragraphContainer1 = document.createElement('p');

    ul.setAttribute('class','personalized-content')
    li.setAttribute('class','followed-topics');
    li2.setAttribute('class','following-posts');
    paragraphContainer.setAttribute('class', 'paragraph1-style');
    paragraphContainer1.setAttribute('class', 'paragraph2-style');

    li.innerHTML = `<h4>Followed Topics</h4> <p>1</p>`;
    li2.innerHTML =`<h4>Following</h4> 
    <p>1</p>`;

   //appending to various elements

   li.appendChild(paragraphContainer)
   ul.appendChild(li);
   ul.appendChild(paragraphContainer);
   ul.appendChild(li2);
   ul.appendChild(paragraphContainer1);

   //adding an event listeners to the subs.
   li.addEventListener('click', (e)=>{
       e.preventDefault();
       let toggleItem = document.querySelector('.paragraph1-style');

       toggleItem.classList.toggle('toggle-this')
   })

   li2.addEventListener('click', (e)=>{
       e.preventDefault();
       
       let toggleItem = document.querySelector('.paragraph2-style');
        toggleItem.classList.toggle('toggle-this')
   })
   //personalizedContainer.appendChild(ul)




