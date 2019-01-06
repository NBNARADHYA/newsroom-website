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

  setInterval(function(){
    FB.getLoginStatus(function(response) {
        statusChangeCallback1(response);
    });
  }, 120000);

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
     console.log("Authenticated Hello");
     document.getElementById("log-out").style.display = "inline";
     document.getElementById("hello").style.display = "none";
     document.getElementById("login_text").style.display = "none";
     document.getElementById("fb-login").style.display = "none";
     FB.api(
       '/me',
       'GET',
       {"fields": "name"},
       function(response){
         if(response && !response.error){
          // checkCookie(response.name);
           alert("Welcome again " + response.name + "!");
         }
       }
     );
     FB.api(
       '/359429951528331',
       'GET',
       {"fields": "id,name,picture,feed{created_time,message,attachments}"},
       function(response){
         if(response && !response.error){
           console.log(response);
           printPosts(response);
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
      '/359429951528331',
      {"fields": "id,name,picture,feed{created_time,message,attachments}"},
      function(response){
        if(response && !response.error){
          console.log(response);
          const len = response.feed.data.length, nam = response.name;
          var posts = document.createElement('div');
          for(i=0 ; i<len; i++){
            if(response.feed.data[i].attachments.data[0].type === "new_album"){
              var div = document.createElement('div');
              div.style.margin = "25px";
              div.style.border = "solid";
              div.style.padding = "25px";
              const label = document.createElement('label');
              label.innerHTML = " <b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
              getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
              response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
              + " " + response.feed.data[i].created_time.substr(0,4);
              div.appendChild(label);
              const image = document.createElement('img');
              image.src ="";
              image.setAttribute("data-src" , response.picture.data.url);
              div.insertBefore(image , label);
              const label1 = document.createElement('label');
              label1.innerHTML = "<br>" + response.feed.data[i].attachments.data[0].title + "<br>";
              div.appendChild(label1);
              if(response.feed.data[i].attachments.data[0].description){
                const label2 = document.createElement('label');
                label2.innerHTML = response.feed.data[i].attachments.data[0].description + "<br>";
                div.appendChild(label2);
              }
              const len1 = response.feed.data[i].attachments.data[0].subattachments.data.length;
              for (var j = 0; j < len1; j++) {
                const image1 = document.createElement('img');
                image1.src = response.feed.data[i].attachments.data[0].subattachments.data[j].media.image.src;
                image1.title = response.feed.data[i].attachments.data[0].subattachments.data[j].description;
                div.appendChild(image1);
                const t = document.createElement('label');
                t.innerHTML = "<br>";
                div.appendChild(t);
              }
              posts.appendChild(div);
            } else if(response.feed.data[i].attachments.data[0].type === "video_inline"){
              var div = document.createElement('div');
              div.style.margin = "25px";
              div.style.border = "solid";
              div.style.padding = "25px";
              const label = document.createElement('label');
              label.innerHTML = " <b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
              getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
              response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
              + " " + response.feed.data[i].created_time.substr(0,4) + "<br>";
              div.appendChild(label);
              const image = document.createElement('img');
              image.src = response.picture.data.url;
              div.insertBefore(image , label);
          /*    const video = document.createElement('iframe');
              video.src = "";
              video.setAttribute("data-src" , response.feed.data[i].attachments.data[0].url);
              video.width = "590";
              video.height = "400";
              video.style.border = "none";
              video.style.overflow = "visible";
              video.allowTransparency = "true";
              video.allow = "encrypted-media";
              video.allowFullScreen = "true";
              div.appendChild(video);*/
              const video = document.createElement('label');
              const divv = document.createElement('div');
              divv.classList.add("fb-video");
              divv.setAttribute("data-href" , response.feed.data[i].attachments.data[0].url);
              divv.setAttribute("data-width" , "500");
              divv.setAttribute("data-show-text" , "true");
              divv.setAttribute("data-allowfullscreen" , "true");
              divv.setAttribute("data-autoplay" , "ture");
              divv.setAttribute("data-show-captions" , "ture");
              video.appendChild(divv);
              div.appendChild(video);
              FB.XFBML.parse(video);
              var body = document.getElementsByTagName('body')[0];
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = 'deferVideos.js';
              body.appendChild(script);
              const label1 = document.createElement('label');
              label1.innerHTML = "<br>" + response.feed.data[i].attachments.data[0].title + "<br>";
              div.appendChild(label1);
            //  var vid_id = response.feed.data[i].attachments.url;
              //let video = '<iframe src=vid_url width="500" height="280" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true"></iframe>';
              //var temp = document.createElement('label');
              //temp.innerHTML = video;
              posts.appendChild(div);
           } else {
             var div = document.createElement('div');
             div.style.margin = "25px";
             div.style.border = "solid";
             div.style.padding = "25px";
             const label = document.createElement('label');
             label.innerHTML = " <b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
             getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
             response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
             + " " + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].message;
             div.appendChild(label);
             const image = document.createElement('img');
             image.src = response.picture.data.url;
             div.insertBefore(image , label);
             posts.appendChild(div);
          }
          if(posts != posts1){
            document.getElementById("badge").innerHTML = len;
            document.getElementById("badge").style.display = "inline";
            printPosts(response);
            posts1 = posts;
          } else {
            document.getElementById("badge").style.display = "none";
          }
        }
      }
    }
    );
} else {
    console.log("Not authenticated");
  }
}

function printPosts(response){
  const len = response.feed.data.length, nam = response.name;
  if(len){
    document.getElementById("badge").innerHTML = len;
    document.getElementById("recent_posts").style.display = "inline";
    document.getElementById("badge").style.display = "inline";
  }
  var posts = document.createElement('div');
  for(i=0 ; i<len; i++){
    if(response.feed.data[i].attachments.data[0].type === "new_album"){
      var div = document.createElement('div');
      div.style.margin = "25px";
      div.style.border = "solid";
      div.style.padding = "25px";
      const label = document.createElement('label');
      label.innerHTML = " <b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
      getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
      response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
      + " " + response.feed.data[i].created_time.substr(0,4);
      div.appendChild(label);
      const image = document.createElement('img');
      image.src ="";
      image.setAttribute("data-src" , response.picture.data.url);
      div.insertBefore(image , label);
      const label1 = document.createElement('label');
      label1.innerHTML = "<br>" + response.feed.data[i].attachments.data[0].title + "<br>";
      div.appendChild(label1);
      if(response.feed.data[i].attachments.data[0].description){
        const label2 = document.createElement('label');
        label2.innerHTML = response.feed.data[i].attachments.data[0].description + "<br>";
        div.appendChild(label2);
      }
      const len1 = response.feed.data[i].attachments.data[0].subattachments.data.length;
      for (var j = 0; j < len1; j++) {
        const image1 = document.createElement('img');
        image1.src = response.feed.data[i].attachments.data[0].subattachments.data[j].media.image.src;
        image1.title = response.feed.data[i].attachments.data[0].subattachments.data[j].description;
        div.appendChild(image1);
        const t = document.createElement('label');
        t.innerHTML = "<br>";
        div.appendChild(t);
      }
      posts.appendChild(div);
    } else if(response.feed.data[i].attachments.data[0].type === "video_inline"){
      var div = document.createElement('div');
      div.style.margin = "25px";
      div.style.border = "solid";
      div.style.padding = "25px";
      const label = document.createElement('label');
      label.innerHTML = " <b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
      getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
      response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
      + " " + response.feed.data[i].created_time.substr(0,4) + "<br>";
      div.appendChild(label);
      const image = document.createElement('img');
      image.src = response.picture.data.url;
      div.insertBefore(image , label);
  /*    const video = document.createElement('iframe');
      video.src = "";
      video.setAttribute("data-src" , response.feed.data[i].attachments.data[0].url);
      video.width = "590";
      video.height = "400";
      video.style.border = "none";
      video.style.overflow = "visible";
      video.allowTransparency = "true";
      video.allow = "encrypted-media";
      video.allowFullScreen = "true";
      div.appendChild(video);*/
      const video = document.createElement('label');
      const divv = document.createElement('div');
      divv.classList.add("fb-video");
      divv.setAttribute("data-href" , response.feed.data[i].attachments.data[0].url);
      divv.setAttribute("data-width" , "500");
      divv.setAttribute("data-show-text" , "true");
      divv.setAttribute("data-allowfullscreen" , "true");
      divv.setAttribute("data-autoplay" , "ture");
      divv.setAttribute("data-show-captions" , "ture");
      video.appendChild(divv);
      div.appendChild(video);
      FB.XFBML.parse(video);
      var body = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'deferVideos.js';
      body.appendChild(script);
      const label1 = document.createElement('label');
      label1.innerHTML = "<br>" + response.feed.data[i].attachments.data[0].title + "<br>";
      div.appendChild(label1);
    //  var vid_id = response.feed.data[i].attachments.url;
      //let video = '<iframe src=vid_url width="500" height="280" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true"></iframe>';
      //var temp = document.createElement('label');
      //temp.innerHTML = video;
      posts.appendChild(div);
   } else {
     var div = document.createElement('div');
     div.style.margin = "25px";
     div.style.border = "solid";
     div.style.padding = "25px";
     const label = document.createElement('label');
     label.innerHTML = " <b>" + nam + "</b><br>" + response.feed.data[i].created_time.substr(8,2) + " " +
     getMonth(parseInt((response.feed.data[i].created_time.substr(5,1)=='0') ?
     response.feed.data[i].created_time.substr(6,1) : response.feed.data[i].created_time.substr(5,2)))
     + " " + response.feed.data[i].created_time.substr(0,4) + "<br>" + response.feed.data[i].message;
     div.appendChild(label);
     const image = document.createElement('img');
     image.src = response.picture.data.url;
     div.insertBefore(image , label);
     posts.appendChild(div);
  }
  }
    posts1 += posts;
    document.getElementById("postfeed").innerHTML = "<h2>Recent Post feed :</h2><br>";
    document.getElementById("postfeed").appendChild(posts);
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

 function checkLoginState() {
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });
 }

 function log_out() {
   FB.logout(function(response){
     window.location.href = "index.html";
   });
 }
