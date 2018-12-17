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
     console.log("Authenticated");
     FB.api(
       '/me',
       {"fields": "id,name,feed{message,attachments,story,created_time}"},
       function(response){
         if(response && !response.error){
           console.log(response);
         }
       }
     );
     window.location.href = "posts.html";
} else {
     console.log("Not authenticated");
   }
 }

 function checkLoginState() {
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });
 }
