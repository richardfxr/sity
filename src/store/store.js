import { browser } from '$app/env';
import { writable } from 'svelte/store';

// initialize stored variables (default values for server)
let storedDefaultCity = null;
let storedHasCity = false;

if (browser) {
    // get stored values from localStorage (null is acceptatble)
    storedDefaultCity = localStorage.defaultCity;
    storedHasCity = !!storedDefaultCity;
}

/* === STORES ============================= */
export const curPage = writable(null);
export const hasCity = writable(storedHasCity);
export const defaultCity = writable(storedDefaultCity);

/* === UPDATES ============================ */
defaultCity.subscribe((value) => {
    // prevent code from running on server
    if (!browser) return
    
    if (value) {
        // set localStorage and change hasCity if value is truthy
        localStorage.defaultCity = value;
        hasCity.set(true);
    } else {
        // remove local storage and change hasCity if value is falsy
        localStorage.removeItem("defaultCity");
        hasCity.set(false);
    }
});