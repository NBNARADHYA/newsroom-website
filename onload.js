window.onload = function(){
  doalert();
  FB.api(
    "/me/feed",
    "GET",
    function (response) {
      if (response && !response.error) {
        console.log(response);
      }
    }
);
}
