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
     document.getElementById("fb-login").style.display = "none";
     console.log("Authenticated");
     FB.api(
       '/me',
       {"fields": "id,name,feed{message,attachments,story,created_time}"},
       function(response){
         if(response && !response.error){
           console.log(response);
           printPosts(response);
         }
       }
     );
  //   window.location.href = "posts.html";
} else {
     console.log("Not authenticated");
   }
 }

function printPosts(response){
  var len = response.feed.data.length, nam = response.name, posts = "";
  for(i=0 ; i<len; i++){
    posts += ("<b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
  getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
  response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
  + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].message + "<br>");
  }
  document.getElementById("postfeed").innerHTML = posts;
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
