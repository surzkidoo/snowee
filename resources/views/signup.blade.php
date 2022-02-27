<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{csrf_token()}}" />
    <link rel="stylesheet" href="style.css">
    <title>Sign Up</title>
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
           <li style="font-size: 18px;"><a href="index.html">Home</a></li>
           <li style="font-size: 18px;"><a href="login.html">Log In</a></li>
           <li class="stat">Stats: 208,456 members</li>
       </ul>
     </div>
          <div class="header-container">
                <h1>Snowy</h1>
             <div class="side-header-container">
             </div>
          </div> 
    </header>
    <div class="container">
        <h1 class="sign-up-h1">Sign Up.</h1>
        <p>Do you have an account already? <a href="login.html" class="sign-in-link">Sign In</a></p>
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