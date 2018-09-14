const { ipcRenderer } = require('electron')

window.sendToElectron= function (channel) {
  ipcRenderer.sendToHost(channel)
}