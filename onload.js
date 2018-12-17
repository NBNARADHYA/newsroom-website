window.onload = function(){
  doalert();
  FB.api(
    "/728219747578813/feed",
    "GET",
    function (response) {
      if (response && !response.error) {
        console.log(response);
      }
    }
);
}
