const {app, BrowserWindow, Menu, Tray, globalShortcut} = require('electron')
let mainWindow
let tray = null
let windowState = false;

const appId = "yandex.music.player";


function playerPlayPause() {
  mainWindow.webContents.send('player', 'play_pause')
}

function playerBack() {
  mainWindow.webContents.send('player', 'back')
}

function playerForward() {
  mainWindow.webContents.send('player', 'forward')
}

function showHide() {
  if (windowState) {
    mainWindow.hide()
    windowState = false
  } else {
    mainWindow.show()
    windowState = true
  }
}

app.on('ready', function() {

  tray = new Tray('icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Открыть",
      click: (item, window, event) => {
        showHide();
      }
    },
    {
      label: "Назад",
      icon: 'previous.png',
      click: (item, window, event) => {
        playerBack()
      }
    },
    {
      label: "Воcпроизвести/Пауза",
      icon: 'play.png',
      click: (item, window, event) => {
        playerPlayPause()
      }
    },
    {
      label: "Вперед",
      icon: 'next.png',
      click: (item, window, event) => {
        playerForward()
      }
    },
    {role: "quit"},
  ])
  tray.setToolTip('Яндекс.Музыка')
  tray.setContextMenu(contextMenu)

  globalShortcut.register('Shift+CommandOrControl+W', () => {
    showHide()
  })
  globalShortcut.register('Shift+CommandOrControl+A', () => {
    playerBack()
  })
  globalShortcut.register('Shift+CommandOrControl+S', () => {
    playerPlayPause()
  })
  globalShortcut.register('Shift+CommandOrControl+D', () => {
    playerForward()
  })

  app.setAppUserModelId(appId)
  mainWindow = new BrowserWindow({width: 1024, height: 768, icon: 'icon.png', show: false })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.setMenu(null)
  //mainWindow.webContents.openDevTools()
  //mainWindow.hide()
  mainWindow.on('minimize',function(event){
    event.preventDefault()
    mainWindow.hide()
  });
});