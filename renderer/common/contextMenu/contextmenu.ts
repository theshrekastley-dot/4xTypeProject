function createContextMenu(arr: [{label: string, role: string, toggled_name?: string | "placeHolder"}], elem: string) {
    let modArr = arr;
    const target = document.getElementById(elem);
    let buttons: Array<string> = []
    const insertButtons = () => {
        modArr.forEach((button) => {
            buttons.push(`<button id="${button.label}">${button.role}</button>`)
        })
        target?.insertAdjacentHTML("afterbegin", `
            <div class="contextMenu">
                ${buttons.join(" ")}
            </div>
            `)
    }

    /* modArr.forEach((btn : {label: string, role: string, toggled_name?: string | "placeHolder"}) => {
        if (btn == null) {
            return;
        }
        document.getElementById(btn.label).onclick = () => {
            modArr.find(obj => obj.role == btn.role).label = btn.toggled_name;
            insertButtons()
        }
    }) TODO */ 
}

createContextMenu([{label: "Pin", role: "set-pin"}], "pageID");


