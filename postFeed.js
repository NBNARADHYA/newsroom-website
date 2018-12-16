FB.api(
  '/100011723838606',
  'GET',
  {"fields":"id,name,feed{created_time,attachments,message,story}"},
  function(response) {
      var posts=JSON.parse(response);
      document.getElementById("postfeed").innerHTML=posts.feed.data[0].message;
  }
);
