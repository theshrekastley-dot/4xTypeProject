const {app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('path')

let windows = []

const createWindow = (htmlPath, width = 800, height = 600) => {
    const window = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 300,
        minHeight: 60,
        frame: false,
        titleBarStyle: 'hidden',
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
    windows = windows.filter(window => window.id !== BrowserWindow.getFocusedWindow.id);
    BrowserWindow.getFocusedWindow().close();
})

ipcMain.on("newWindow", (event, WindowPath, width, height) => {
    const temp = createWindow(path.join(__dirname, "../" ,WindowPath), width, height);
    windows.push({window: temp, id: temp.id});
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})