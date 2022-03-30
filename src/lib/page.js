// imports
import { browser } from '$app/env';
import { curPage } from '../store/store.js';

export function onPageLoad(pageName, prevCurPage, pageHeading) {
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

    return;
}