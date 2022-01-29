//menu toggler function
const toggleMenu = document.querySelector('.container-div');

/* toggling functionality */
toggleMenu.addEventListener('click', ()=>{
    var toggleItem = document.querySelector('.collapsible-menu')
    toggleItem.classList.toggle('show')
  }) 

  const upVoteHandle=()=>{
    const upVote = document.querySelectorAll('.u-vote');
    upVote.forEach((upvotes)=>{

  upvotes.addEventListener('click', (e)=>{
      let thread_id= $(upvotes).attr('upid');
      if(!thread_id || thread_id =="undefined"){
          alert("login bro")
          return
      }
      //
      thread_id=thread_id.split('-')
      jQuery.ajax({
       url: "http://127.0.0.1:8000/upvote",
       method: 'post',
       data:{
         [thread_id[0]]:thread_id[1]

       },
       success: function(data){
       console.log(data)
        $(upvotes).next().text(data)
       
       },
       error: function(e){
           console.log(e);
       }
       });
      //
       let add = document.querySelector('.add')
       upvotes.classList.toggle('add')
   }) 
})
}


const downVoteHandle=()=>{
  const upVote = document.querySelectorAll('.d-vote');
  upVote.forEach((upvotes)=>{

upvotes.addEventListener('click', (e)=>{
 
    let thread_id= $(upvotes).attr('upid');
    if(!thread_id || thread_id =="undefined"){
        alert("login brro")
        return
    }
    //
    thread_id=thread_id.split('-')
    jQuery.ajax({
     url: "http://127.0.0.1:8000/downvote",
     method: 'post',
     data:{
       [thread_id[0]]:thread_id[1]

     },
     success: function(data){
     
        $(upvotes).next().text(data)
     
     },
     error: function(e){
         console.log(e);
     }
     });
    //
     let add = document.querySelector('.add')
     upvotes.classList.toggle('add')
 }) 
})


}

