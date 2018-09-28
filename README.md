# Electron Yandex.Music Player
Простой плеер для сервиса Яндекс.Музыка

Основа - [ElectronJS](https://github.com/electron/electron)

# Горячии клавиши
- <kbd>Shift+Ctrl+W</kbd> - Показать/скрыть окно плеера
- <kbd>Shift+Ctrl+A</kbd> - Предыдущий трек
- <kbd>Shift+Ctrl+S</kbd> - Воспроизвести/Пауза
- <kbd>Shift+Ctrl+D</kbd> - Следующий трек
- <kbd>Shift+Ctrl+C</kbd> - Добавить трек в избранное/удалить трек из избранного

# Установка из исходников
```
git clone https://github.com/iredun/electron.yandex.music.player
cd electron.yandex.music.player
npm install
npm start
```

Для того что бы собрать исполняемый файл под свою систему
```
npm run build
```

Для сборки MSI установщика под Windows

Установить [Wix toolkit v3](http://wixtoolset.org/releases/)

Перед запуском сборки установщика, должен быть собран билд командой выше
```
npm run create-win-installer
```