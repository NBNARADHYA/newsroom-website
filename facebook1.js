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
     document.getElementById("log-out").style.display = "inline";
     console.log("Authenticated");
     FB.api(
       '/me',
       {"fields": "id,name,feed{message,attachments,story,created_time}"},
       function(response){
         if(response && !response.error){
           console.log(response);
           showRecentPosts(response);
         }
       }
     );
} else {
     console.log("Not authenticated");
   }
 }

function showRecentPosts(response) {
  var len = response.feed.data.length;
  if(len){
    document.getElementById("badge").innerHTML = len;
    document.getElementById("recent_posts").style.display = "inline";
    document.getElementById("badge").style.display = "inline";
  }
}

 function log_out() {
   FB.logout(function(response){
     window.location.href = "index.html";
   });
 }
