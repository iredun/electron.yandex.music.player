const {ipcRenderer} = require('electron')
const webview = document.querySelector('webview')
const notifier = require('node-notifier');

function notifiTrack(track) {
    notifier.notify(
        {
            title: track.title,
            message: track.artists[0].title,
            icon: __dirname + '/icon.png', // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: false // Wait with callback, until user action is taken against notification
        }
    );
}

function getNextTrackInfo() {
    console.log('msg_next')
    webview.executeJavaScript('externalAPI.getNextTrack();', false, (track) => {
        notifiTrack(track)
    })
}

function getPrevTrackInfo() {
    webview.executeJavaScript('externalAPI.getPrevTrack();', false, (track) => {
        notifiTrack(track)
    })
}

function getTrackInfo() {
    webview.executeJavaScript('externalAPI.getTrack();', false, (track) => {
        notifiTrack(track)
    })
}

ipcRenderer.on('player', (event, arg) => {
    if (arg == 'play_pause') {
        webview.executeJavaScript('externalAPI.togglePause();')
        getTrackInfo()
    }
    if (arg == 'back') {
        getPrevTrackInfo()
        webview.executeJavaScript('externalAPI.prev();')        
    }
    if (arg == 'forward') {
        getNextTrackInfo()
        webview.executeJavaScript('externalAPI.next();')        
    } 
})