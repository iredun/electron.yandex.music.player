const {ipcRenderer} = require('electron')
const webview = document.querySelector('webview')
const notifier = require('node-notifier')

function notifiTrack(track) {
    let like = track.liked ? '❤️' : '💔'
    notifier.notify(
        {
            title: track.title + like,
            message: track.artists[0].title,
            icon: __dirname + '/icon.png', // Absolute path (doesn't work on balloons)
            sound: false, // Only Notification Center or Windows Toasters
            wait: false // Wait with callback, until user action is taken against notification
        }
    );
}

function getNextTrackInfo() {
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
    webview.executeJavaScript('externalAPI.getCurrentTrack();', false, (track) => {
        notifiTrack(track)
    })
}

webview.addEventListener('dom-ready', function(){ 
    webview.executeJavaScript('externalAPI.on(externalAPI.EVENT_TRACK, function() { window.sendToElectron(externalAPI.EVENT_TRACK) });')
});

webview.addEventListener('ipc-message', (event) => {
    if (event.channel == 'track') {
        getTrackInfo()
    }
})
ipcRenderer.on('player', (event, arg) => {
    if (arg == 'play_pause') {
        webview.executeJavaScript('externalAPI.togglePause();')
    }
    if (arg == 'back') {
        webview.executeJavaScript('externalAPI.prev();')        
    }
    if (arg == 'forward') {
        webview.executeJavaScript('externalAPI.next();')        
    }
    if (arg == 'like') {
        webview.executeJavaScript('externalAPI.toggleLike();')        
    }
})