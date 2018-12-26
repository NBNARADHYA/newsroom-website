var posts1 = "";

window.fbAsyncInit = function() {
  FB.init({
    appId      : '359151004888978',
    autoLogAppEvents : true,
    cookie     : true,
    xfbml      : true,
    version    : 'v3.2'
  });

  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
  });

  setInterval(function(){
    FB.getLoginStatus(function(response) {
        statusChangeCallback1(response);
    });
  }, 120000);

};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 function statusChangeCallback(response){
   if(response.status === "connected"){
     console.log("Authenticated Hello");
     document.getElementById("log-out").style.display = "inline";
     document.getElementById("hello").style.display = "none";
     document.getElementById("login_text").style.display = "none";
     document.getElementById("fb-login").style.display = "none";
     FB.api(
       '/me',
       'GET',
       {"fields": "name"},
       function(response){
         if(response && !response.error){
           alert("Welcome again " + response.name + "!");
         }
       }
     );
     FB.api(
       '/379659976120888',
       'GET',
       {"fields": "id,name,feed{created_time,message,attachments}"},
       function(response){
         if(response && !response.error){
           console.log(response);
           printPosts(response);
        }
       }
     );
} else {
     console.log("Not authenticated");
   }
 }

function statusChangeCallback1(response) {
  if(response.status === "connected"){
    console.log("Authenticated");
    FB.api(
      '/379659976120888',
      {"fields": "id,name,feed{created_time,message,attachments}"},
      function(response){
        if(response && !response.error){
          console.log(response);
          var len = response.feed.data.length, nam = response.name;
          var posts = document.createElement('div');
          for(i=0 ; i<len; i++){
            if(response.feed.data[i].message){
              var div = document.createElement('div');
              div.style.margin = "25px";
              div.style.border = "solid";
              div.style.padding = "25px";
              div.innerHTML = "<br><b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
              getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
              response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
              + " " + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].message;
              posts.appendChild(div);
            } else {
              var div = document.createElement('div');
              div.style.margin = "25px";
              div.style.border = "solid";
              div.style.padding = "25px";
              div.innerHTML = "<br><b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
              getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
              response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
              + " " + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].attachments.data[0].title + "<br>";
              posts.appendChild(div);
              var video = document.createElement('div');
              video.classList.add("fb-video");
              video.data.href = "https://www.facebook.com/379659976120888/videos/1226228857553051/";
              video.style.data.width = "404";
              posts.appendChild(video);
          }
          }
          if(posts != posts1){
            document.getElementById("badge").innerHTML = len;
            document.getElementById("badge").style.display = "inline";
            printPosts(response);
            posts1 = posts;
          } else {
            document.getElementById("badge").style.display = "none";
          }
        }
      }
    );
} else {
    console.log("Not authenticated");
  }
}

function printPosts(response){
  var len = response.feed.data.length, nam = response.name;
  if(len){
    document.getElementById("badge").innerHTML = len;
    document.getElementById("recent_posts").style.display = "inline";
    document.getElementById("badge").style.display = "inline";
  }
  var posts = document.createElement('div');
  for(i=0 ; i<len; i++){
    if(response.feed.data[i].message){
      var div = document.createElement('div');
      div.style.margin = "25px";
      div.style.border = "solid";
      div.style.padding = "25px";
      div.innerHTML = "<br><b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
      getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
      response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
      + " " + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].message;
      posts.appendChild(div);
    } else {
      var div = document.createElement('div');
      div.style.border = "solid";
      div.style.margin = "25px";
      div.style.padding = "25px";
      div.innerHTML = "<br><b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
      getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
      response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
      + " " + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].attachments.data[0].title + "<br>";
      posts.appendChild(div);
      var video = document.createElement('div');
      video.classList.add("fb-video");
      video.data.href = "https://www.facebook.com/379659976120888/videos/1226228857553051/";
      video.style.data.width = "404";
  }
  }
    posts1 += posts;
    document.getElementById("postfeed").innerHTML = "<h2>Recent Post feed :</h2><br>";
    document.getElementById("postfeed").appendChild(posts);
}

function getMonth(month){
  switch (month) {
    case 1: return "January"; break;
    case 2: return "February"; break;
    case 3: return "March"; break;
    case 4: return "April"; break;
    case 5: return "May"; break;
    case 6: return "June"; break;
    case 7: return "July"; break;
    case 8: return "August"; break;
    case 9: return "September"; break;
    case 10: return "October"; break;
    case 11: return "November"; break;
    case 12: return "December"; break;
  }
}

 function checkLoginState() {
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });
 }

 function log_out() {
   FB.logout(function(response){
     window.location.href = "index.html";
   });
 }
