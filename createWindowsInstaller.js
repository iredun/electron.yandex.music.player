var MSICreator = require("electron-wix-msi").MSICreator;

async function start() {
  const msiCreator = new MSICreator({
    appDirectory: __dirname + '/builds/ya.music.player-win32-x64',
    outputDirectory: __dirname + '/builds/win-installer',
    description: 'A player for Yandex.Music, based web browser',
    exe: 'ya.music.player',
    name: 'Yandex.Music.Player',
    manufacturer: 'IvanRedun',
    version: '1.0.0',
    appUserModelId: 'yandex.music.player',
    ui: {
      chooseDirectory: true,
      images: {
          banner: __dirname + '/images/icon.png'
      }
    }
  });

  await msiCreator.create();

  await msiCreator.compile();
}

start();