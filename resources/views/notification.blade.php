<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{csrf_token()}}" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
    <title>Notifications | Snowy</title>
    <script src="/js/app.js"></script>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous">   </script>
</head>
<body>
<header>
       
       <div class="collapsible-menu" id="collapsible-menu">
           <ul>
           <li><a href="/user/muhammad">View Profile</a></li>
          <li><a href="/user/followers">Followers</a></li>
          <li><a href="/user/following">Following</a></li>
          <li><a href="/login">Log out</a></li>
          <li class="stat">Stats: 208,456 members</li>
         </ul>
      </div>
         <div class="header-container">
               <h1>Loopy</h1>
               <div class="cont">
               <button class="login-button">Login</button>
               <button class="sign-up-button">Sign up</button>
               <div class="profile-dropdown">
               <img src="http://127.0.0.1:8000/{{auth()->user()->avatar}}" alt="avatar" class="avatar"> 
               <div class="profile-up"></div> 
               </div>
                  <div class="container-header">
                  <input type="text" placeholder="search here">
                   <div class="fa fa-search header-search" style="color:#8c00ff;"></div>
               </div>
           </div>
         </div> 
         
  </header>
      <div class="notification-container">
        <div class="first-notification-head">
            <h2><span>Notifications</span></h2> 
         
        </div>
        <div class="notification-menu" id="notification-menu">
           
        </div>
    </div>
    <div class="resting-nav-bar">
        <li> <a href="/"><div class="hello fa fa-home"></div></a></li>
        <li><a href="/section"><div class="hello fa fa-users"></div></a></li>
        <li class="notification-relative"><a href="/notification" style="border-bottom: 2px solid #ffffff"><div class="hello fa fa-bell"></div></a> <span class="span-notification">10</span></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>
    </div> 
      
 <script src="main.js"></script>

 <script>
let NpageNum = 5;
jQuery.ajax({
                url: "http://127.0.0.1:8000/getnotification",
                    method: "get",
                    success: function (data) {
                        console.log(data)
                        notificationTemplete(data.data,(newdata)=>{
                            $('#notification-menu').append(newdata)
                        });
                        initPagination(data.first_page_url.split('=')[0],2,'#notification-menu',false,"noti")

                    },
                    error: function (e) {
                        console.log(e);
                    },
                });


 Echo.private('notification.{{auth()->user()->id}}').listen('NewNotification',(e)=>{
     console.log(e)
    let newdata = `
             <div class="notifis-head">
                <img src="${e.notification.user_invoker.avatar}" alt="">
                <p><strong>@${e.notification.user_invoker.username}</strong> ${e.notification.message}</p>
            </div>
             `
    $('#notification-menu').prepend(newdata);


 })              
 </script>
</body>
</html>