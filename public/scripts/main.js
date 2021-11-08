// main JavaScript file which imports all other scripts


// === IMPORTS ================================
// import './modules/themeswitcher'

// Theme swithcer JavaScript file


// ThemeSwitcher class. Code by Max Böck
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