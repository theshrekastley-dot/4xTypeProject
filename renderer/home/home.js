import { initializeTitleBar } from "../common/titlebar.js"
initializeTitleBar();

const winTitle = document.getElementById("winTitle")
const settingsBtn = document.getElementById("settingsBtn");

winTitle.textContent = "Home";

settingsBtn.onclick = () => {
    window.electron.newWindow("renderer/settings/settings.html", 400, 200)
}


