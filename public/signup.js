

//sign up validation
const fullName = document.querySelector('.full-name');
const signUpEmail = document.querySelector('.sign-up-email');
const dateBirth = document.querySelector('.date-of-birth');
const signUpUsername = document.querySelector('.signUpUsername');
const signUpPassword = document.querySelector('.signUpPassword');
const submitSignUp = document.querySelector('.sign-up-submit');
const form = document.querySelector('.signup-form');
//adding event listener to the sign up form
submitSignUp.addEventListener('click', (e)=>{

  if(fullName.value.length < 5 || fullName.value === ''){
    fullName.style.border = '2.5px solid red';
    fullName.placeholder = 'please input a valid name';
  } else{
    fullName.style.border = '2.5px solid green';
  }

  if(signUpEmail.value.length < 5 || signUpEmail.value === '' || signUpEmail.value.indexOf('@') === -1){
    signUpEmail.style.border = '2.5px solid red';
    signUpEmail.placeholder = "please input a valid e-mail '@'"
  } else{
    signUpEmail.style.border = '2.5px solid green';
  }

  if(dateBirth.value.length < 4 || dateBirth.value.indexOf('-') === -1){
    dateBirth.style.border = '2.5px solid red';
    dateBirth.placeholder = 'please input a valid date of birth DD-MM-YYYY';
  } else{
    dateBirth.style.border = '2.5px solid green';
  }

  if(signUpUsername.value.length < 1 || signUpUsername.value === ''){
    signUpUsername.value = '';
    signUpUsername.style.border = '2.5px solid red';' '
    signUpUsername.placeholder = 'please input a valid username';

  } else if(signUpUsername.value.length > 15){
    signUpUsername.value = '';
    signUpUsername.style.border = '2.5px solid red';
    signUpUsername.placeholder = 'usernames should not be more than 15 characters';

  } else{
    signUpUsername.style.border = '2.5px solid green';
  }
 
  if(signUpPassword.value.length < 3 || signUpPassword.value === ''){
    signUpPassword.value = '';
    signUpPassword.style.border = '2.5px solid red';' '
    signUpPassword.placeholder = 'passwords should be more than 5 characters';
  } else{
    signUpPassword.style.border = '2.5px solid green';
  }
    

        $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
          }
      });
        jQuery.ajax({
          url: "http://127.0.0.1:8000/signup",
          method: 'post',
          data: {
              name: fullName.value,
              email:signUpEmail.value,
              dob:dateBirth.value,
              username:signUpUsername.value,
              password:signUpPassword.value
        
          },
          success: function(data){
            if(data.status){
              window.location= data.redirect_location
            }
          },
          error: function(e){

              if(e.responseJSON.email){
                signUpEmail.value = '';
                signUpEmail.style.border = '2.5px solid red';
                signUpEmail.placeholder = e.responseJSON.email;
              }

              if(e.responseJSON.fullname){
                fullName.value = '';
                fullName.style.border = '2.5px solid red';
                fullName.placeholder = e.responseJSON.fullname;
              }

              if(e.responseJSON.username){
                signUpUsername.value = '';
                signUpUsername.style.border = '2.5px solid red';
                signUpUsername.placeholder = e.responseJSON.username;
              }
              if(e.responseJSON.dob){
                dateBirth.value = '';
                dateBirth.style.border = '2.5px solid red';
                dateBirth.placeholder = e.responseJSON.dob;
              }
              console.log(e);
          }
        
        });

})