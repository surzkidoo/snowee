//setting up variables
const followingCount = document.querySelector('.following-count');
const commentContainer = document.querySelector('.following-area')

const allFollowing = commentContainer.querySelectorAll('.grid-following');





$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
    }
});

  let username=$("#user_id").attr("fid")
  let authid=$("#following-area").attr("authid")
  jQuery.ajax({
    url: `http://127.0.0.1:8000/user/${username}/getfollowing`,
    method: 'get',
    success: function(data){
    if(data){
      var newData=  data.map(users=>{
         let {user,following}=users
            return `
            <div class="grid-following" id="grid-following">
                <img src="http://127.0.0.1:8000/${user.avatar}" alt="">
                ${authid==user.id?"<p>You</p>":`<p>@${user.username}</p>
                <button class="unfollow" fbid="${user.id}">${following?"following":"follow"}</button>`}
            </div>
            `
        })
    }
    $("#following-area").append(newData);
    const unfollowButton = document.querySelectorAll('.unfollow');
    unfollowButton.forEach((button)=>{
        button.addEventListener('click', (e)=>{
            let follow_id=$(button).attr("fbid");
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

