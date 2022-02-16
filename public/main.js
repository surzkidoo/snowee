//menu toggler function
const toggleMenu = document.querySelector(".container-div");

/* toggling functionality */
toggleMenu.addEventListener("click", () => {
    var toggleItem = document.querySelector(".collapsible-menu");
    toggleItem.classList.toggle("show");
});

const upVoteHandle = () => {
    const upVote = document.querySelectorAll(".u-vote");
    upVote.forEach((upvotes) => {
        $(upvotes)
            .off("click")
            .on("click", (e) => {
                let thread_id = $(upvotes).attr("upid");
                if (!thread_id && thread_id == "undefined") {
                    alert("login brro");
                    return;
                }
                //
                thread_id = thread_id.split("-");
                jQuery.ajax({
                    url: "http://127.0.0.1:8000/upvote",
                    method: "post",
                    data: {
                        [thread_id[0]]: thread_id[1],
                    },
                    success: function (data) {
                        console.log(data);
                        $(upvotes).next().text(data);
                    },
                    error: function (e) {
                        console.log(e);
                    },
                });
                //
                let add = document.querySelector(".add");
                upvotes.classList.toggle("add");
            });
    });
};

const downVoteHandle = () => {
    const upVote = document.querySelectorAll(".d-vote");
    upVote.forEach((downvotes) => {
        $(downvotes)
            .off("click")
            .on("click", (e) => {
                let thread_id = $(downvotes).attr("upid");
                if (!thread_id || thread_id == "undefined") {
                    alert("login brro");
                    return;
                }
                //
                thread_id = thread_id.split("-");
                jQuery.ajax({
                    url: "http://127.0.0.1:8000/downvote",
                    method: "post",
                    data: {
                        [thread_id[0]]: thread_id[1],
                    },
                    success: function (data) {
                        $(downvotes).next().text(data);
                    },
                    error: function (e) {
                        console.log(e);
                    },
                });
                //
                let add = document.querySelector(".add");
                downvotes.classList.toggle("add");
            });
    });
};

function topicTemplete(data, callback) {
    const newdata = data.map((post) => {
        return `
    <div class="card">
         <div class="image-head">
            <img src="${post.user.avatar}" alt="thumbnail">
            <div class="username"><a href="profile.html" class="this">@${
                post.user.username
            } ${
            post.user.verified === 1
                ? '<div class="fa fa-check-circle" id="checked"></div>'
                : ""
        }</a><p class="details">originally posted in<a href="section/${post.section.name.toLowerCase()}">${
            post.section.name
        }</a></p></div>
         </div>
            <div class="content-box">
            <h1>${post.title}</h1>
            <p>${post.content}</p>
            <div class="post-image">
                ${
                    post.image.length != 0
                        ? `<img src="${post.image[0].url}" alt="image">`
                        : ""
                }
            </div>
            <div class="post-tools">
                 <p class="like"><div class="fa fa-arrow-circle-up u-vote" id="upvote" upid="thread_id-${
                     post.id
                 }"></div> <span class="like-counter">${
            post.upvote_count
        }</span></p>
                 <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="thread_id-${
                     post.id
                 }"></div> <span class="dislike-counter">${
            post.downvote_count
        }</span></p> 
                 <p class="dislike"><div class="fa fa-comment"id="comment"></div> <span class="comment-counter">${
                     post.posts_count
                 }</span></p> 
                 <button class="see-more"><a href=${
                     post.slug
                 }>more...</a></button>
            </div>
             </div>
    `;
    });
    return callback(newdata);
}
//Commet Templete 
function commentTemplete(data, callback) {
    const newdata = data.map(post=>{
        return`
           <div class="comments" id="${post.id}">
             <div class='flex-comment'>
             <img src="${post.user.avatar}" alt="commenter" class="img-avatar">
             <div class="commenters-name">@${post.user.username}<p             
             class="date">${post.created_at}</p></div>
             </div>
             <p class="comment-content">${post.content}</p>
             <div class="edited">(edited)</div>
             <div class="post-tools" id="comments-icons">
             <p class="like"><div class="fa fa-arrow-circle-up u-vote"id="upvote" upid="post_id-${post.id}"></div> <span class="like-counter">${post.upvote_count}</span></p>
             <p class="dislike"><div class="fa fa-arrow-circle-down d-vote"id="downvote" upid="post_id-${post.id}"></div> <span class="dislike-counter">${post.downvote_count}</span></p> 
             <div class="side-comment">
                 <p><div class="fa fa-trash-alt delete-side-comment"></div></p>
                 <p><div class="fa fa-edit edit-side-comment"></div></p>
                 <p class="edit-reply-comment">reply<span class="comments-number"></span></p>
                 <p><div class="fa fa-exclamation-triangle edit-report-comment"></div></p>
             </div>
             </div>
             <div class="div-reply">
             <div class="comment-text comment-menu">
             <textarea class="post this-textarea" placeholder="write a comment" rows="1"></textarea>
             <button class="link"><div class="fa fa-paperclip" id="link-it"></div></button>
             <button class="send"><div class="fa fa-share" id="do-comment"></div></button>
             </div>
             </div>
             </div>
          `
      ;
      })
    return callback(newdata);
}





//scroll


function initPagination(url, page = 2, container, loading = false,type) {
    $(window).scroll(function () {
        if (
            $(window).scrollTop() + $(window).height() >=
                $(document).height() &&
            !loading && $('#more').text()!="No More"
        ) { 
           
            $(container).append("<div id='more' class='load-action'>View More</div>")
            loading = true;
            $('.load-action').on('click',function(){
           
            infinteLoadMore(page, url, container,type);
            loading = false;
            page++;
           
            });
        }
    });
}

function infinteLoadMore(page, url, container,type) {
    jQuery.ajax({
        url: `${url}=${page}`,
        method: "get",

        success: function (data) {
          
            if (data) {
                console.log(data)
                if (data.data.length==0) {
                    alert("dds")
                    $('#more').text("No More")
                    return
                }
                if(type=="topic"){
                    topicTemplete(data.data, (newdata) => {
                    $('#more').remove();
                    $(container).append(newdata);
                });
                upVoteHandle();
                downVoteHandle();
                
                }
                else if(type=="comment"){
                    commentTemplete(data.data, (newdata) => {
                        alert("sd")
                        $('#more').remove();
                        $(container).append(newdata);
                    });
                    upVoteHandle();
                    downVoteHandle();
                }
                
                
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}



