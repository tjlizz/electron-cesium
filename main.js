const { app, BrowserWindow } = require('electron')
let win;

function createWindow() {

    // 创建浏览器窗口
    win = new BrowserWindow({
        fullscreen: false,
        resizable: true,

        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
  win.loadURL('http://lizeze.com:8080/#/')
}


app.on('ready', createWindow)

