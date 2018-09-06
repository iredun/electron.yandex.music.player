const {app, BrowserWindow, Menu, Tray, globalShortcut} = require('electron')
let mainWindow
let tray = null
const template = [{}]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

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
  mainWindow.show();
}

app.on('ready', function() {

  tray = new Tray('icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Открыть",
      accelerator: 'CmdOrCtrl+S',
      click: (item, window, event) => {
        showHide();
      }
    },
    {
      label: "<--Назад", click: (item, window, event) => {
        playerBack()
      }
    },
    {
      label: "Пауза/Воcпроизвести", click: (item, window, event) => {
        playerPlayPause()
      }
    },
    {
      label: "Вперед-->", click: (item, window, event) => {
        playerForward()
      }
    },
    {role: "quit"},
  ])
  tray.setToolTip('Яндекс.Музыка')
  tray.setContextMenu(contextMenu)

  globalShortcut.register('Ctrl+Shift+Alt+Q', () => {
    showHide()
  })
  globalShortcut.register('Ctrl+Shift+Alt+A', () => {
    playerBack()
  })
  globalShortcut.register('Ctrl+Shift+Alt+S', () => {
    playerPlayPause()
  })
  globalShortcut.register('Ctrl+Shift+Alt+D', () => {
    playerForward()
  })

  mainWindow = new BrowserWindow({width: 1024, height: 768 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.hide();
  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });
});