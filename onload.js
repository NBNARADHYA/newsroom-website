window.onload = function(){
  doalert();
  FB.api(
    '/me',
    'GET',
    {"fields":"id,name,feed{created_time,attachments,message,story}"},
    function(response) {
      console.log(response);
    }
  );
}
