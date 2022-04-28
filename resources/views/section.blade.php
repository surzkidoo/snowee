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
            <li class="different-li"><img src="http://127.0.0.1:8000/avatar.png" alt=""> <p>@muhammad</p> </li>
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
    <div class="container-section">
     <div class="forums-catalog">
         <h1> <span>
            All Spaces
         </span> 
         </h1>
         <div class="forums-list" id="forums-list">
         <a href="advertisement.html"><p><span class="fa fa-bullhorn"></span> Advertisement</p></a>
            <a href="Announcement.html"><p><span class="fa fa-volume-up"></span> Announcement</p></a>
            <a href="Advise.html"><p><span class="fa fa-question-circle"></span> Advise</p></a>
            <a href="Agriculture.html"><p><span class="fa fa-seedling"></span> Agriculture</p></a>
            <a href="Autos.html"><p><span class="fa fa-car"></span> Auto</p></a>
            <a href="Arts.html"><p><span class="fa fa-palette"></span> Arts</p></a>
            <a href="business.html"><p><span class="fa fa-hand-holding-usd"></span> Business</p></a>
            <a href="computer.html"><p><span class="fa fa-tv"></span> Computer</p></a>
            <a href="crimes.html"><P><span class="fa fa-newspaper"></span>Crime</P></a>
          <a href="christianity.html"><p><span class="fa fa-bible"></span>Christianity</p></a>
          <a href="career.html"><p><span class="fa fa-briefcase"></span> Career</p></a>
          <a href="culture.html"><p><span class="fa fa-globe"></span> Culture</p></a>
          <a href="current-affairs.html"><p><span class="fa fa-landmark"></span> Current Affairs</p></a>
          <a href="car.html"><p><span class="fa fa-comments"></span> Car Discussion</p></a>
          <a href="celebrities.html"><p><span class="fa fa-fire-alt"></span> Celebrities Gist</p></a>
          <a href="contest.html"><p><span class="fa fa-layer-group"></span> Contest</p></a>
          <a href="crypto.html"><p><span class="fab fa-bitcoin"></span> Crypto</p></a>
          <a href="diary.html"><p><span class="fa fa-book-open"></span> Diaries</p></a>
          <a href="education.html"><p><span class="fa fa-school"></span> Education</p></a>
          <a href="entertainment.html"><p><span class="fa fa-glass-cheers"></span> Entertainment</p></a>
          <a href="forex.html"><p><span class="fa fa-infinity"></span> Forex</p></a>
          <a href="finance.html"><p><span class="fa fa-euro-sign"></span> Finance</p></a>
          <a href="family.html"><p><span class="fa fa-restroom"></span> Family</p></a>
          <a href="fashion.html"><p><span class="fa fa-tshirt"></span> Fashion</p></a>
          <a href="food.html"><p><span class="fa fa-utensils"></span> Foodies Lounge</p></a>
          <a href="graphics.html"><p><span class="fa fa-images"></span> Graphics</p></a>
          <a href="health.html"><p><span class="fa fa-heartbeat"></span> Health and Fitness</p></a>
          <a href="investment.html"><p><span class="fa fa-puzzle-piece"></span> Investment</p></a>
          <a href="islam.html"><p><span class="fa fa-star-and-crescent"></span> Islam</p></a>
          <a href="jokes.html"><p><span class="fa fa-smile-wink"></span> Jokes</p></a>
          <a href="literature.html"><p><span class="fa fa-pen-fancy"></span> Literature</p></a>
          <a href="movies.html"><p><span class="fa fa-film"></span> Movies</p></a>
          <a href="music.html"><p><span class="fa fa-music"></span> Music</p></a>
          <a href="programming.html"><p><span class="fa fa-code"></span> Programming</p></a>
          <a href="politics.html"><p><span class="fa fa-handshake"></span> Politics</p></a>
          <a href="phones.html"><p><span class="fa fa-mobile"></span> Phones</p></a>
          <a href="pets.html"><p><span class="fa fa-paw"></span> Pets</p></a>
          <a href="relationship.html"><p><span class="fa fa-heart"></span> Relationship</p></a>
          <a href="sme.html"><p><span class="fa fa-chart-line"></span> Small Businesses</p></a>
          <a href="sports.html"><p><span class="fa fa-running"></span> Sports</p></a>
          <a href="technology.html"><p><span class="fa fa-laptop-code"></span> Technology</p></a>
          <a href="tech-market.html"><p><span class="fa fa-search-location"></span> Tech Market</p></a>
          <a href="thoughts.html"><p><span class="fa fa-cloud"></span> Thoughts</p></a>
          <a href="travel.html"><p><span class="fa fa-plane"></span> Travel</p></a>
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