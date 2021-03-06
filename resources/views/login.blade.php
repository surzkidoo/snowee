<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_token" content="{{csrf_token()}}" />
    <link rel="stylesheet" href="style.css">
    <title>Log In</title>
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
           <li style="font-size: 18px;"><a href="signup.html">Sign Up</a></li>
           <li class="stat">Stats: 208,456 members</li>
       </ul>
     </div>
          <div class="header-container">
                <h1>Snowy</h1>
             <div class="side-header-container">
             </div>
          </div> 
    </header>
    <div class="container" id="container-sign-in">
        <h1 class="sign-in-1">Sign In.</h1>
        <div class="forgot-password-container">
        <p>Don't have an account? <a href="signup.html" class="sign-in-link">Sign up</a> or </p> <p class="forgot-password">forgot password?</p>
        </div>
        <form id="form-sign-in">
            <input type="text" 
            placeholder="Username" class="sign-in-username"> <br>
            <input type="password" 
            placeholder='Password' class="sign-in-password">
            <input type="button" id="submit-login" value="Sign in">
        </form>
    </div>
    <script src="main.js"></script>
    <script src="login.js"></script>
</body>
</html>