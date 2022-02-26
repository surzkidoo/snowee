
//popular page 

let initpopular=true;
let initPersonerlizd=true;
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
       topicTemplete(data.data,(newdata)=>{
         $(".container-home").append(newdata);
       })
       
        upVoteHandle()
        downVoteHandle()
        downvoteTopicCounter()
        upvoteTopicCounter()
        data.data.length > pageNum && initPagination(data.first_page_url.split('=')[0],2,'.container-home',false,"topic")
     
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

    !popular.classList.contains('active') && active.classList.remove('active');

    if(popular.classList.contains('active')){
        popular = popular;
    } else{
        popular.classList.add('active')
     
    }
    const cardArray = document.querySelector('.container-home').style.display = 'block';
    const personalizedContainer = document.querySelector('.personalized-home').style.display = 'none'
})

//personalized page
personalized.addEventListener('click', (e)=>{
    e.preventDefault();
    
    const active = document.querySelector('.active')

    ! personalized.classList.contains('active') && active.classList.remove('active');

    if(personalized.classList.contains('active')){
        personalized = personalized;
    } else{
       
        personalized.classList.add('active')
        initPersonerlizd && jQuery.ajax({
            url: "http://127.0.0.1:8000/user/feed",
            method: 'get',
        
            success: function(data){
              if(data){
                  console.log(data)
               topicTemplete(data.data,(newdata)=>{
                 $(".personalized-home").append(newdata);
               })
               
                upVoteHandle()
                downVoteHandle()
                downvoteTopicCounter()
                upvoteTopicCounter()
                data.data.length > pageNum && initPagination(data.url.split('=')[0],2,'.personalized-home',false,"topic","personlized")
              initPersonerlizd=false;
            }
            },
            error: function(e){
                console.log(e);
            }
          
          });
    }
    const card = document.querySelector('.container-home').style.display = 'none';
    const personalizedContainer = document.querySelector('.personalized-home').style.display = 'block'


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




