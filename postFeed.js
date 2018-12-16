window.fbAsyncInit = function() {
  FB.init({
    appId      : '359151004888978',
    xfbml      : true,
    version    : 'v3.2'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
 
FB.api(
  '/me',
  'GET',
  {"fields":"id,name,feed{created_time,attachments,message,story}"},
  function(response) {
    console.log(response);
    var posts=JSON.parse(response);
    document.getElementById("postfeed").innerHTML=posts.feed.data[0].message;
  }
);
