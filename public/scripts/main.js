// main JavaScript file which imports all other scripts

// ThemeSwitcher class. Based on code by Max Böck
class ThemeSwitcher {
    constructor() {
        // default theme
        this.activeTheme = 'light'

        this.init()
    }

    init() {
        // determine preferred theme
        const systemPreference = this.getSystemPreference()
        const storedPreference = this.getStoredPreference()
        console.log('localStorage theme: ' + storedPreference)

        // override system default
        if (storedPreference) {
            this.activeTheme = storedPreference
        } else if (systemPreference) {
            this.activeTheme = systemPreference
        }
    }

    getSystemPreference() {
        // check if the system default is set to darkmode
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return false
    }

    getStoredPreference() {
        // check if the user has selected a theme before
        if (typeof Storage !== 'undefined') {
            console.log('localStorage theme: ' + localStorage.getItem('theme'))
            return localStorage.getItem("theme")
        }
        return false
    }

    setTheme(id) {
        // set the theme id on the <html> element
        this.activeTheme = id
        document.documentElement.setAttribute('data-theme', id)
    
        // save theme in localStorage
        localStorage.setItem("theme", id)
        console.log('set localStorage theme to ' + id)
        

        console.log('theme set to ' + id)
    }
}

// check custom property support before creation
if (window.CSS && CSS.supports('color', 'var(--fake-var)')) {
    theme = new ThemeSwitcher()
}



// set version number in footer
function setVersion() {
    // get version <p>
    let version = document.getElementById("footer__version")

    // website version text
    version.innerHTML = "v0.1.14 alpha development preview."
}



// index page map route toggle
function toggleRoute(category) {
    // get map div
    let map = document.getElementById("map")
    // get appropriate button
    let button = document.getElementById(category + "RouteToggle")

    // toggle category class
    if (map.classList.contains(category)) {
        // remove class if it already exists
        map.classList.remove(category)
        // change aria-pressed value
        button.setAttribute('aria-pressed', 'false')
    } else {
        // add class otherwise
        map.classList.add(category)
        // change aria-pressed value
        button.setAttribute('aria-pressed', 'true')
    }
}



// faq page answer show/hide toggle
function toggleAnswer(id) {
    // get faq container
    let container = document.getElementById(id)
    // get question <button>
    let question = document.getElementById(id + "__question")
    // get answer <p>
    let answer = document.getElementById(id + "__answer")

    // toggle answer visibility
    if (container.classList.contains("hidden")) {
        // show answer and remove class
        question.setAttribute("aria-expanded", "true")
        answer.setAttribute("aria-hidden", "false")
        container.classList.remove("hidden")
    } else {
        // hide answer and remove class
        question.setAttribute("aria-expanded", "false")
        answer.setAttribute("aria-hidden", "true")
        container.classList.add("hidden")
    }
}