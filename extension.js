var isFirefox = typeof InstallTrigger !== 'undefined';

let beacon = document.createElement("div");
beacon.classname = browser.runtime.id;
document.body.appendChild(beacon);

if (isFirefox && !document.getElementsByClassName("expected-extension-id").length) {
  alert("Please install a Firefox add-on Ignore X-Frame-Options Header");
  window.location.href = "https://addons.mozilla.org/en-US/firefox/addon/ignore-x-frame-options-header/";
}
