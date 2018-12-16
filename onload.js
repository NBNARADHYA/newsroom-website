window.onload = function(){
  doalert();
  FB.api(
    "/me/feed",
    function (response) {
      if (response && !response.error) {
        console.log(response);
      }
    }
);
}
