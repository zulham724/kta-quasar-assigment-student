import store from "./../store";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    const isLoggedIn = store().getters["Auth/isLoggedIn"];

    if (isLoggedIn) {
        // console.log(cordova,FCM)
        store().dispatch('Notif/init')
    }
}
