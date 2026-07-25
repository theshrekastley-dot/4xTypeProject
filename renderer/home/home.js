import { initializeTitleBar } from "../common/titleBar/titlebar.js";

initializeTitleBar();

const winTitle = document.getElementById("winTitle")
const settingsBtn = document.getElementById("settingsBtn");
const pageElement = document.getElementById("pageID")

winTitle.textContent = "Home";

let settingsOn = false;


settingsBtn.onclick = async () => {
    if (!settingsOn) {
        await window.electron.newWindow("renderer/settings/settings.html", 400, 200)
    }
}


