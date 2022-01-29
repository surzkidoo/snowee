<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
    <title>Spaces | Snowy</title>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous">
    </script>
</head>
<body>
    <header>
        <div class="container-div">
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
       </div>
        <div class="collapsible-menu" id="collapsible-menu">
            <ul>
            <li class="different-li"><img src="img/img_avatar.png" alt=""> <p>@muhammad</p> </li>
            <li><a href="profile.html">View profile</a></li>
           <li><a href="followers.html">Followers</a></li>
           <li><a href="following.html">Following</a></li>
           <li><a href="signup.html">Log out</a></li>
           <li class="stat">Stats: 208,456 members</li>
       </ul>
     </div>
          <div class="header-container">
                <h1>Snowy</h1>
                <div class="container-header">
                    <div class="fa fa-search"></div>
                </div>
             </div>
          </div> 
    </header>
    <div class="container">
     <div class="forums-catalog">
         <h1> <span>
            All Spaces
         </span> 
         </h1>
         <div class="forums-list" id="forums-list">
          
           </div>
        </div>  
    </div> 
    <div class="resting-nav-bar">
        <li> <a href="/"><div class="hello fa fa-home"></div></a></li>
        <li><a href="/section"><div class="hello fa fa-users"></div></a></li>
        <li><a href="notifications.html"><div class="hello fa fa-bell"></div></a></li>
        <li><a href="messages.html"><div class="hello fa fa-envelope"></div></a></li>
    </div>
 <script src="main.js"></script>
 <script>

$.ajax({
    url: "http://127.0.0.1:8000/section-data",
    method: 'get',
   
    success: function(data){
      if(data){
       const newdata =data.map(section=>{
           return `
           <a href="section/${section.name.toLowerCase()}"><p><span class="${section.icon}"></span>${section.name}</p></a>
           `
       });
       $(".forums-list").append(newdata);
      }
    },
    error: function(e){
        console.log(e);
    }
  
  });
 </script>
</body>
</html>