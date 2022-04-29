
const signInUsername = document.querySelector('.sign-in-username');
const signInPassword = document.querySelector('.sign-in-password');
const submitSignIn = document.querySelector('#submit-login');
//adding event listener to the sign in form
submitSignIn.addEventListener('click', (e)=>{
  submitSignIn.value = 'Loading🚀'
       $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
          }
      });
        jQuery.ajax({
          url: "http://127.0.0.1:8000/login",
          method: 'post',
          data: {
    
              username:signInUsername.value,
              password:signInPassword.value
        
          },
          success: function(data){
            window.location.href=data.redirect_location
            signInUsername.style.border = '2.5px solid green';
            signInPassword.style.border = '2.5px solid green';
            submitSignIn.value = 'Success🎉'
          },
          error: function(e){
            if(e.status==422){
              signInUsername.value = '';
              signInUsername.style.border = '2.5px solid red';
              signInUsername.placeholder = 'please input a correct username'
          
              signInPassword.value = '';
              signInPassword.style.border = '2.5px solid red';
              signInPassword.placeholder = 'please input a correct password'
            }
            submitSignIn.value = 'Error⚠'
          }});

  
})
