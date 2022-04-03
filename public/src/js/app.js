var deferredPrompt
// checks if browser supports service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function () {
    console.log("Service worker registered");
    })
}

window.addEventListener("beforeinstallprompt",function(e){
e.preventDefault();
deferredPrompt=e;
return false;
})