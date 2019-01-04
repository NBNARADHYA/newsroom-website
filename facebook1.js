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

/*  setInterval(function(){
    FB.getLoginStatus(function(response) {
        statusChangeCallback1(response);
    });
  }, 120000);*/

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
       '/379659976120888',
       'GET',
       {"fields": "id,name,feed{created_time,message,attachments}"},
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



 function log_out() {
   FB.logout(function(response){
     window.location.href = "index.html";
   });
 }
