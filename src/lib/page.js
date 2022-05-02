// imports
import { browser } from '$app/env';
import { curPage } from '../store/store.js';

export function onPageLoad(pageName, prevCurPage, pageHeading, pageClr) {
    // prevents code from running if on server or no pageName was given
    if (!browser || !pageName) return;

    let firstLoad = false;

    if(!prevCurPage) {
        firstLoad = true;
        console.log("first load, no focus change.")
    }
    
    // set curPage value
    curPage.set(pageName);
    // focus on h1 elemtent if not first load
    if(!firstLoad) {
        pageHeading.focus();
        console.log("focused on:", pageHeading);
    }

    // set page colors
    if(pageClr === "default") {
        document.body.style.setProperty('--pageClr-800', "var(--clr-800)");
        document.body.style.setProperty('--pageClr-700', "var(--clr-700)");
        document.body.style.setProperty('--pageClr-600', "var(--clr-600)");
        document.body.style.setProperty('--pageClr-250', "var(--clr-250)");
        document.body.style.setProperty('--pageClr-150', "var(--clr-150)");
        document.body.style.setProperty('--pageClr-100', "var(--clr-100)");
        document.body.style.setProperty('--pageClr-50', "var(--clr-50)");
        document.body.style.setProperty('--pageClr-0', "var(--clr-0)"); 
    } else {
        document.body.style.setProperty('--pageClr-800', "var(--clr-" + pageClr + "-800)");
        document.body.style.setProperty('--pageClr-700', "var(--clr-" + pageClr + "-700)");
        document.body.style.setProperty('--pageClr-600', "var(--clr-" + pageClr + "-600)");
        document.body.style.setProperty('--pageClr-250', "var(--clr-" + pageClr + "-250)");
        document.body.style.setProperty('--pageClr-150', "var(--clr-" + pageClr + "-150)");
        document.body.style.setProperty('--pageClr-100', "var(--clr-" + pageClr + "-100)");
        document.body.style.setProperty('--pageClr-50', "var(--clr-" + pageClr + "-50)");
        document.body.style.setProperty('--pageClr-0', "var(--clr-" + pageClr + "-0)"); 
    }

    // set body background color
    document.body.style.setProperty('background-color', "var(--pageClr-50)"); 

    return;
}