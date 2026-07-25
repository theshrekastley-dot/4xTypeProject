const {app, BrowserWindow, ipcMain, Menu} = require('electron/main')
const path = require('path')

let windows = []
let usedPaths = []

const createWindow = (htmlPath, width = 800, height = 600) => {
    const window = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 300,
        minHeight: 60,
        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: false,
        title: "Game",
        webPreferences: {
            
            preload: path.join(__dirname, "preload.js")
        }
    })
    window.loadFile(htmlPath);

    return window
}



app.whenReady().then(() => {
    const temp = createWindow("renderer/home/home.html");
    windows.push({window: temp, id: temp.id});
})

ipcMain.on("max", (event) => {
    BrowserWindow.getFocusedWindow().maximize();
})

ipcMain.on("min", (event) => {
    BrowserWindow.getFocusedWindow().minimize();
})


ipcMain.on("close", (event) => {
    if (windows.find(window => 1 === BrowserWindow.getFocusedWindow().id)) {
        windows.forEach((window) => {
            if (window.window.isDestroyed()) {
                window = null;
                return;
            }
            window.window.close()
        })
        windows = []
    }

    windows = windows.filter(window => window.id !== BrowserWindow.getFocusedWindow().id);
    BrowserWindow.getFocusedWindow().close();
})

ipcMain.handle("newWindow", (event, WindowPath, width, height) => {
    if (windows.find(window => window.path === WindowPath)) {
        return;
    }
    const temp = createWindow(path.join(__dirname, "../", WindowPath), width, height);
    let curWindow = {window: temp, id: temp.id, path: WindowPath}
    windows.push(curWindow);
    return curWindow.id;
})

ipcMain.on("pinner", (event, windowID, setFlag) => {
    
    const window = windows.find(window => windowID === window.id)
    window.window.setAlwaysOnTop(setFlag, "floating");
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})