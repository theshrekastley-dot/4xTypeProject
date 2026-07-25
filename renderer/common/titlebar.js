

export function initializeTitleBar() {

    document.body.insertAdjacentHTML("afterbegin", 
        `<div class="titleBar">
            <img src="../../assets/icons/rocket.ico" width="16" height="16" id="ico">
            <h1 id="winTitle">Window Title</h1>
            <button id="maximize"></button>
            <button id="minimize"></button>
            <button id="close"></button>
        </div>`)


    const max = document.getElementById('maximize');
    const min = document.getElementById('minimize');
    const close = document.getElementById('close');

    max.onclick = () => {
        window.electron.max()
    }

    min.onclick = () => {
        window.electron.min()
    }

    close.onclick = () => {
        window.electron.close()
    }

}