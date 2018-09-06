const {ipcRenderer} = require('electron')
const webview = document.querySelector('webview')

function getNextTrackInfo() {
    webview.executeJavaScript('externalAPI.getNextTrack();', false, (track) => {
        let myNotification = new Notification(track.title, {
            body: track.artists[0].title
        })
    })
}

function getPrevTrackInfo() {
    webview.executeJavaScript('externalAPI.getPrevTrack();', false, (track) => {
        let myNotification = new Notification(track.title, {
            body: track.artists[0].title
        })
    })
}

function getTrackInfo() {
    webview.executeJavaScript('externalAPI.getTrack();', false, (track) => {
        let myNotification = new Notification(track.title, {
            body: track.artists[0].title
        })
    })
}

ipcRenderer.on('player', (event, arg) => {
    if (arg == 'play_pause') {
        webview.executeJavaScript('externalAPI.togglePause();');
        getTrackInfo();   
    }
    if (arg == 'back') {
        getPrevTrackInfo();
        webview.executeJavaScript('externalAPI.prev();');        
    }
    if (arg == 'forward') {
        getNextTrackInfo();
        webview.executeJavaScript('externalAPI.next();');        
    } 
})