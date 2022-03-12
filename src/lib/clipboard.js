/**
 * Copies current URL to clipboard by calling copyText().
 * Only works on client.
 * 
 * @returns nothing
 */
export async function copyURL() {
    // get current URL
    let url = window.location.href;

    // call copyText with URL
    await copyText(url);

    return;
}


/**
 * Copies text to clipboard with the clipboard API as well as document.execCommand fallback.
 * Only works on client.
 * 
 * @param {string} text text to be copied to the clipboard
 * @returns nothing
 */
export async function copyText(text) {
    if (navigator.clipboard) {
        // if clipboard API is available, write URL to clipboard
        await navigator.clipboard.writeText(text);
    } else {
        // if clipboard API is not available

        // create dummy input element
        let clipboardDummy = document.createElement('input');

        // append dummy input to document body and set URL as value
        document.body.appendChild(clipboardDummy);
        clipboardDummy.value = url;

        // select dummy input and copy it (execComand is not deprecated)
        clipboardDummy.select();
        document.execCommand('copy');

        // remove dummy input
        document.body.removeChild(clipboardDummy);
    }

    return;
}