//declaring variables
const followBack = document.querySelector('.add');
const block = document.querySelector('.block');

//Upvote
//adding event listeners
    let followBackClicked =  true;
  followBack.addEventListener('click', (e)=>{
    let follow_id=$(followBack).attr("fbid");
    alert(follow_id)
    jQuery.ajax({
        url: `http://127.0.0.1:8000/setfollow`,
        method: 'post',
        data:{
            follow_id
        },
        success: function(data){
          console.log(data)
        if(data==0){
           return  $(followBack).text("follow")
        }
        $(followBack).text("following")
       
       
    },
        error:function(e){
            console.log(e);
        }
})
    
    
    //  if(followBackClicked){
    //      currentButton.style.backgroundColor = 'yellow';
    //      currentButton.style.color = 'black';
    //      currentButton.textContent = 'following';
    //      followBackClicked = false;
    //  } else if(!followBackClicked){
    //      currentButton.style.backgroundColor = '#0000FF';
    //      currentButton.style.color = 'white';
    //      currentButton.textContent = 'follow';
    //      followBackClicked = true;
    //  }
  })

  let blockClicked =  true;
  block.addEventListener('click', (e)=>{
    let follow_id=$(followBack).attr("fbid");
    jQuery.ajax({
        url: `http://127.0.0.1:8000/user/${follow_id}/block`,
        method: 'get',
        success: function(data){
          console.log(data)
        if(data==0){
           return  $(block).text("Block")
        }
        $(block).text("Blocked")
       
       
    },
        error:function(e){
            console.log(e);
        }
})
    //  let currentButton = e.target;
    //  if(blockClicked){
    //      currentButton.innerHTML = 'blocked';
    //      blockClicked = false;
    //  } else if(!blockClicked){
    //      currentButton.innerHTML = 'block';
    //      blockClicked = true;
    //  }
  })

  
