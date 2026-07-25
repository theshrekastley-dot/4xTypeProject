const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    close: () => ipcRenderer.send("close"),
    min: () => ipcRenderer.send("min"),
    max: () => ipcRenderer.send("max"),

    newWindow: (WindowPath, width = 800, height = 600) => ipcRenderer.invoke("newWindow", WindowPath, width, height),
    pinner: (window, setFlag) => ipcRenderer.send("pinner", window, setFlag)
});

document.addEventListener('DOMContentLoaded', () => {
    const pageID = document.getElementById('pageID')
    pageID.addEventListener('contextmenu', async (event) => {
        event.preventDefault()
        let windowID = await ipcRenderer.invoke("newWindow", 'renderer/common/contextMenu/contextMenu.html', 50, 40)
        ipcRenderer.send("pinner", windowID, true)
    })
})