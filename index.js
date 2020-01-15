const { app, BrowserWindow, ipcMain, dialog } = require('electron')
let dbServer = require('./main/datastore')
let windows = {}
let win;


const httt = require('./main/server')


let _3DPaths = [];

function addWindow(code, win) {
    if (!windows[code]) {
        windows[code] = win
    }
}

function getWindow(code) {
    return windows[code]
}

function createWindow() {


    // 创建浏览器窗口
    win = new BrowserWindow({
        fullscreen: false,
        resizable: false,
        minWidth: 600,
        minHeight: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.webContents.openDevTools()
    addWindow('main', win)
    win.on('maximize', () => {
        // console.log('456')
    })
    win.on('minimize', () => {
        // console.log('123')
    })
    win.on('resize', () => {
        // console.log('789')
    })
    win.webContents.on('did-finish-load', () => {
        httt.createServer(8988, (port) => {
            win.webContents.send('port', port);

        })

    })

    // 加载index.html文件
    win.loadFile('./render/index.html')

    
}




app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
ipcMain.on('changeWindow', (event, arg) => {
    let currentWin = getWindow(arg.winCode)
    switch (arg.type) {
        case 'setting':
            currentWin.openDevTools()
            break
        case 'min':
            currentWin.minimize()
            break
        case 'max':


            break
        case 'close':
            currentWin.close()
            break
    }
})


ipcMain.on('add3D', (event, arg) => {
    console.log(arg)

    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'], filters: [
            { name: 'json', extensions: ['json'] }

        ]
    }).then((data) => {

        let path = data.filePaths[0];
        let staticPath = path.substr(0, path.lastIndexOf('\\'))
        let nameList = path.split('\\')
        let fileName = nameList[nameList.length - 1]
        let id = arg
        dbServer.db.get('_3D').push({
            staticPath,
            fileName,
            id

        }).write()
        httt.addStatisPath(id, staticPath)
        event.sender.send('finsh3D', id)
    })
})
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

