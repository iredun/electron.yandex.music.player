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

function playerLike() {
  mainWindow.webContents.send('player', 'like')
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

  tray = new Tray(__dirname +'/images/icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Развернуть/Свернуть главное окно",
      icon: __dirname + '/images/browser-window.png',
      click: (item, window, event) => {
        showHide();
      }
    },
    {
      label: "Назад",
      icon: __dirname + '/images/previous.png',
      click: (item, window, event) => {
        playerBack()
      }
    },
    {
      label: "Воcпроизвести/Пауза",
      icon: __dirname + '/images/play.png',
      click: (item, window, event) => {
        playerPlayPause()
      }
    },
    {
      label: "Лайк/Дизлайк",
      icon: __dirname + '/images/review.png',
      click: (item, window, event) => {
        playerLike()
      }
    },
    {
      label: "Вперед",
      icon: __dirname + '/images/next.png',
      click: (item, window, event) => {
        playerForward()
      }
    },
    {
      label: "Выход",
      icon: __dirname + '/images/logout.png',
      role: "quit"
    },
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
  globalShortcut.register('Shift+CommandOrControl+C', () => {
    playerLike()
  })

  globalShortcut.register('MediaPreviousTrack', () => {
    playerBack()
  })
  globalShortcut.register('MediaPlayPause', () => {
    playerPlayPause()
  })
  globalShortcut.register('MediaNextTrack', () => {
    playerForward()
  })

  app.setAppUserModelId(appId)
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: __dirname + '/icon.png',
    show: false,
    webPreferences: {
      nativeWindowOpen: true,
      affinity: 'main-window'
    }
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.setMenu(null)
  mainWindow.on('minimize',function(event){
    event.preventDefault()
    mainWindow.hide()
  });

  mainWindow.webContents.on('new-window', function (e, url, frameName, disposition, options) {
    options.webPreferences.affinity = 'main-window'
  });

  app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
  });
});