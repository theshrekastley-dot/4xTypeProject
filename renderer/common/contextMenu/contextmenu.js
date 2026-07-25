"use strict";
function createContextMenu(arr, elem) {
    let modArr = arr;
    const target = document.getElementById(elem);
    let buttons = [];
    const insertButtons = () => {
        modArr.forEach((button) => {
            buttons.push(`<button id="${button.label}">${button.role}</button>`);
        });
        target?.insertAdjacentHTML("afterbegin", `
            <div class="contextMenu">
                ${buttons.join(" ")}
            </div>
            `);
    };
    modArr.forEach((btn) => {
        if (btn == null) {
            return;
        }
        document.getElementById(btn.label).onclick = () => {
            modArr.find(obj => obj.role == btn.role).label = btn.toggled_name;
            insertButtons();
        };
    });
}
createContextMenu([{ label: "Pin", role: "set-pin" }], "pageID");
