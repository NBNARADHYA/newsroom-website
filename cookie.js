var cookie = "";

function setCookie(exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  cookie += expires + ";path=/";
  document.cookie = cookie;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(name) {
  var user = getCookie("username");
  if (user === name && user !== "") {
    const len = getCookie("length");
    var pageIdArray = "";
    for (var i = 0; i < len; i++) {
      if(i !== len - 1){
        pageIdArray += getCookie("pageId" + i) + ",";
      } else {
        pageIdArray += getCookie("pageId" + i);
      }
    }
    return pageIdArray;
  } else {
    document.getElementById("pageSelection").style.display = "block";
    document.getElementById("postfeed").style.display = "none";
    cookie += "username=" + name + ";";
  }
}

function getPages() {
  var pages = document.getElementsByClassName("checkboxClass");
  var len = 0;
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].checked) {
      len ++;
    }
  }
  cookie += "length=" + len + ";";
  var j = 1;
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].checked) {
      cookie += "pageId" + j + "=" + pages[i].value + ";";
      j ++;
    }
  }
  setCookie(365);
}

function checkAll(ele) {
   var checkboxes = document.getElementsByTagName('input');
   if (ele.checked) {
       for (var i = 0; i < checkboxes.length; i++) {
           if (checkboxes[i].type == 'checkbox') {
               checkboxes[i].checked = true;
           }
       }
   } else {
       for (var i = 0; i < checkboxes.length; i++) {
           if (checkboxes[i].type == 'checkbox') {
               checkboxes[i].checked = false;
           }
       }
   }
}
