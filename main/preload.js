const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    close: () => ipcRenderer.send("close"),
    min: () => ipcRenderer.send("min"),
    max: () => ipcRenderer.send("max"),

    newWindow: (WindowPath, width = 800, height = 600) => ipcRenderer.send("newWindow", WindowPath, width, height)
});
