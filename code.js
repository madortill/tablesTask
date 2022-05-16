let strLocation = "front-div";

window.addEventListener("load", () => {
    document.querySelector(".loader").classList.add("fade");
    document.querySelector(".odot-logo").addEventListener("click", odot);
    document.querySelector(`#next-button`).addEventListener("click", nextText)
});

// פונקציה האחראית על פתיחת האודות
let odot = () => {
    document.querySelector(`.${strLocation}`).style.display = "none";
    document.querySelector(`.div-odot`).style.display = "block";  
    document.querySelector(`.div-body`).style.overflow = "hidden";
    document.querySelector(`.odot-logo`).style.display = "none";  
    document.querySelector(`#back-button-odot`).addEventListener("click", () => {
        document.querySelector(`.${strLocation}`).style.display = "block";
        document.querySelector(`.div-odot`).style.display = "none";  
        document.querySelector(`.odot-logo`).style.display = "block";  
        document.querySelector(`.div-body`).style.overflow = "scroll";
    })
}
    
let nextText = () => {
    nText++;
    document.querySelector(`.p-bubble`).innerHTML = arrOpeningText[nText];
    document.querySelector(`#back-button`).style.display = "block";
    document.querySelector(`#back-button`).addEventListener("click", backText);
    // debugger;
    if (nText === arrOpeningText.length - 1) {
        document.querySelector(`#next-button`).setAttribute("src", "assets/media/start_button.svg");
        document.querySelector(`.next-button`).addEventListener("click", switchToPageDrop);
    }
}

let switchToPageDrop = () => {
    document.querySelector(`.front-div`).style.display = "none";
    document.querySelector(`.div-drop`).style.display = "block";
    strLocation = "div-drop";
    setDrag();
    setDrop();
    createItems();
    shuffle(DATA.sortToGroups);
}

let backText = () => {
    if (nText === arrOpeningText.length - 1) {
        document.querySelector(`#next-button`).setAttribute("src", "assets/media/next_button.svg");
        document.querySelector(`.next-button`).removeEventListener("click", switchToPageDrop);
    }
    nText--;
    document.querySelector(`.p-bubble`).innerHTML = arrOpeningText[nText];
    if (nText === 0 ) {
        document.querySelector(`#back-button`).style.display = "none";
    }
}

finishPage = () => {
    document.querySelector(`.front-div`).style.display = "block";
    document.querySelector(`.div-drop`).style.display = "none";
    document.querySelector(`.div-button`).style.display = "none";
    strLocation = "front-div";
    document.querySelector(`.p-bubble`).innerHTML = `כל הכבוד! <br> ועסקה זאת עסקה, הקוד הוא ${CODE}`;
}

/*
shuffle
------------------------------------------------
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal
------------------------------------------------
*/
function shuffle(arr) {
    let tmp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}

/* El
--------------------------------------------------------------
Description: for all of the options - dont delete */
function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}
