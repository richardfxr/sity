// Theme swithcer JavaScript file


// ThemeSwitcher class. Code by Max Böck
class ThemeSwitcher {
    constructor() {
        // default theme
        this.activeTheme = 'light'

        // get theme buttons
        this.themeSelectBtns = document.querySelectorAll('button[data-theme-id]')
        this.init()
    }

    init() {
        // determine preferred theme
        const systemPreference = this.getSystemPreference()
        const storedPreference = this.getStoredPreference()

        // override system default
        if (storedPreference) {
            this.activeTheme = storedPreference
        } else if (systemPreference) {
            this.activeTheme = systemPreference
        }

        // !!!!!!when clicked, get the theme id and pass it to a function
        Array.from(this.themeSelectBtns).forEach((btn) => {
            const id = btn.dataset.themeId
            btn.addEventListener('click', () => this.setTheme(id))
        })
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
            return localStorage.getItem("theme")
        }
        return false
    }

    setTheme(id) {
        // set the theme id on the <html> element
        this.activeTheme = id
        document.documentElement.setAttribute('data-theme', id)
    
        // save theme in localStorage
        if (this.hasLocalStorage) {
            localStorage.setItem("theme", id)
        }
    }
}

// check custom property support before creation
if (window.CSS && CSS.supports('color', 'var(--fake-var)')) {
    new ThemeSwitcher()
}