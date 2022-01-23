//setting up variables
const followersCount = document.querySelector('.followers-count');
const allFollowers = document.querySelectorAll('.grid-follower');
const followBackButton = document.querySelectorAll('.follow-back');

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
    }
});

  let username=$("#user_id").attr("fid");
  let authid=$("#followers-area").attr("authid")
  jQuery.ajax({
    url: `http://127.0.0.1:8000/user/${username}/getfollower`,
    method: 'get',
    success: function(data){
    if(data){
      var newData=  data.map(users=>{
        let {user,following}=users
            return `
            <div class="grid-follower" id="grid-follower">
                <img src="http://127.0.0.1:8000/${user.avatar}" alt="">
                ${authid==user.id?"<p>You</p>":`<p>@${user.username}</p>
                <button class="follow-back" fbid="${user.id}">${following?"following":"follow"}</button>`}
            </div>
            `
        })
    }
    $("#followers-area").append(newData);
    const unfollowButton = document.querySelectorAll('.follow-back');
    unfollowButton.forEach((button)=>{
        button.addEventListener('click', (e)=>{
           
            let follow_id=$(button).attr("fbid");
            alert(follow_id)
            jQuery.ajax({
                url: `http://127.0.0.1:8000/setfollow`,
                method: 'post',
                data:{
                    follow_id
                },
                success: function(data){
                if(data==0){
                   return  $(button).text("follow")
                }
                $(button).text("following")
               
               
            },
                error:function(e){
                    console.log(e);
                }
        })
        })
    })
    },
    error: function(e){
        console.log(e);
    }
  
  });


//adding event listeners
// followBackButton.forEach((followBack)=>{
//     let followBackClicked =  true;
//   followBack.addEventListener('click', (e)=>{
//      let currentButton = e.target;
//      if(followBackClicked){
//          currentButton.style.backgroundColor = 'blue';
//          currentButton.style.color = 'white';
//          currentButton.innerHTML = 'following';
//          followBackClicked = false;
//      } else if(!followBackClicked){
//          currentButton.style.backgroundColor = 'yellow';
//          currentButton.style.color = 'black';
//          currentButton.innerHTML = 'follow back';
//          followBackClicked = true;
//      }
//   })
// });

//followers count
