<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{csrf_token()}}" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css">
    <link rel="stylesheet" href="style.css">
    <title>Sign Up</title>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous">
</script>
</head>
<body>
<header>
       
       <div class="collapsible-menu" id="collapsible-menu">
           <ul>
           <p id="id"   loggin-id="{{auth()->check()? auth()->user()->id :0}}"></p>
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
               <a href="/login"> <button class="login-button">Login</button> </a>
               <a href="/signup"><button class="sign-up-button">Sign up</button> </a> 
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
    <div class="container">
        <h1 class="sign-up-h1">Sign Up.</h1>
        <p>Do you have an account already? <a href="/login" class="sign-in-link">Sign In</a></p>
        <form class="signup-form" id="signup-form">
            <input type="text" placeholder="Full Name" class="full-name"><br>
            <input type="text" placeholder="E-mail" class="sign-up-email"> <br>
            <input type="text" placeholder="DD-MM-YYYY" class="date-of-birth"> <br>
            <input type="text" placeholder="Username" class="signUpUsername"> <br>
            <input type="password" placeholder='Password' class="signUpPassword"><br>
            <input type="button" id="submit" class="sign-up-submit" value ='Sign up'>
        </form>
    </div>
    <script src="main.js"></script>
    <script src="signup.js"></script>
</body>
</html>