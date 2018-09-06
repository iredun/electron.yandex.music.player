const {ipcRenderer} = require('electron')
const webview = document.querySelector('webview')

ipcRenderer.on('player', (event, arg) => {
    if (arg == 'play_pause') {
        webview.executeJavaScript('externalAPI.togglePause();');        
    }
    if (arg == 'back') {
        webview.executeJavaScript('externalAPI.prev();');
    }
    if (arg == 'forward') {
        webview.executeJavaScript('externalAPI.next();');
    } 
})