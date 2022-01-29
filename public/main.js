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

//scroll
function initPagination(url, page = 2, container, loading = false) {
    $(window).scroll(function () {
        if (
            $(window).scrollTop() + $(window).height() >=
                $(document).height() &&
            !loading
        ) {
            loading = true;
            infinteLoadMore(page, url, container);
            page++;
            loading = false;
        }
    });
}

function infinteLoadMore(page, url, container) {
    jQuery.ajax({
        url: `${url}=${page}`,
        method: "get",

        success: function (data) {
            if (data) {
                console.log(data);
                topicTemplete(data.data, (newdata) => {
                    $(container).append(newdata);
                });
                upVoteHandle();
                downVoteHandle();
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}
