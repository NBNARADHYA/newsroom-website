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
  }, 5000);

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

 function statusChangeCallback1(response) {
   if(response.status === "connected"){
     console.log("Authenticated");
     FB.api(
       '/me',
       {"fields": "id,name,feed{message,attachments,story,created_time}"},
       function(response){
         if(response && !response.error){
           console.log(response);
           var len = response.feed.data.length, posts = "", nam = response.name;
           for(i=0 ; i<len; i++){
             posts += ("<b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
           getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
           response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
           + " " + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].message + "<br>");
           }
           if(posts != PosTs){
             document.getElementById("badge").innerHTML = len;
             document.getElementById("badge").style.display = "inline";
             PosTs = posts;
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
