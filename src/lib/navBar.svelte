<script>
    // imports
    import { browser } from '$app/env';
    import { onMount, afterUpdate } from 'svelte';
    import { curPage, hasCity, defaultCity, defaultCityName } from '../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';

    /**CSS varaible props
     * --pageClr-800 - icon default color
     * --pageClr-700 - naviga=ion link hover background color
     * --pageClr-100 - navigation bar background color
     * --pageClr-0 - icon hover and focus-visible color
     */

    /* === DECLARATIONS ======================= */
    let currentPage;
    let showCity = false; // do not show city link if SSR
    let cityId = null;
    let cityName = null;
    let cityLink;
    let magicCircleVrt;
    let magicCircleHrz;

    /* === STORES ============================= */
    curPage.subscribe(value => {
        currentPage = value;
        updateMagicCircle();
    });

    if (browser) {
        hasCity.subscribe(value => {
            showCity = value;

            // update city link so it is tabbable
            setCityLinkTab();

            updateMagicCircle();
        });

        defaultCity.subscribe(value => {
            cityId = value;
        });

        defaultCityName.subscribe(value => {
            cityName = value;
        });
    }    

    /* === EVENT HANDLERS ===================== */
    /**
     * Sets magic circle translateX and translateY so that it moves to event.target
     * 
     * @param {Object} event 
     */
    function moveMagicCircle(event) {
        // remove current active class
        let activeLink = document.querySelector(`#navBar a.active`);
        if (activeLink) {
            activeLink.classList.remove("active");
        };

        setMagicCircleVrtTo(event.target.offsetTop);
        setMagicCircleHrzTo(event.target.offsetLeft);
    };

    /**
     * Updates magic circle translateX and translateY so that it moves to a.active
     */
    function updateMagicCircle() {
        // returns if currentPage or magic circles are falsy
        if (!currentPage || !magicCircleVrt || !magicCircleHrz) return;

        // get active link
        // uses `#${currentPage}Link` because "#navBar a.active" doesn't update in time
        let activeLink = document.querySelector(`#${currentPage}Link`);
        activeLink.classList.add("active");

        setMagicCircleVrtTo(activeLink.offsetTop);
        setMagicCircleHrzTo(activeLink.offsetLeft);
    };

    /**
     * Update currentPage to newPage and calls updateMagicCircle()
     * 
     * @param {string} newPage
     */
    function setNewPage(newPage) {
        currentPage = newPage;
        console.log("set currentPage to:", currentPage);
        updateMagicCircle();
    };

    /* === FUNCTIONS ========================== */
    /**
     * Sets translateY of vertical magic circle (#magicCircleVrt) to offsetTop
     * 
     * @param {number} offsetTop top offset (in px but without units)
     */
    function setMagicCircleVrtTo(offsetTop) {
        magicCircleVrt.style.transform = "translateY(" + offsetTop + "px)";
    };

    /**
     * Sets translateX of horizontal magic circle (#magicCircleHrz) to offsetLeft
     * 
     * @param {number} offsetLeft left offset (in px but without units)
     */
    function setMagicCircleHrzTo(offsetLeft) {
        magicCircleHrz.style.transform = "translateX(" + offsetLeft + "px)";
    }

    /**
     * Updates #cityLink tabindex value depending on showCity
     */
    function setCityLinkTab() {
        // returns if cityLink is not bound yet
        if (!cityLink) return;

        if (showCity) {
            // make city link tabbable
            cityLink.setAttribute("tabindex", "0");
        } else {
            // make city link non-tabbable
            cityLink.setAttribute("tabindex", "-1");
        }
    };

    /* === LIFECYCLE HOOKS ==================== */
    onMount(() => {
        // set initial position for magic circle
        updateMagicCircle();

        // add active class so circles are displayed
        magicCircleVrt.classList.add("active");
        magicCircleHrz.classList.add("active");

        // set city link tabindex
        setCityLinkTab();

        // update magic circle position on window resize
        window.onresize = updateMagicCircle;
    });

    /* === REACTIVE DECLARATIONS ============== */
    /* reactive declarations to apply active class to links
     * there is a bug where element.classList.add() doesn't always work when going to a new page
     */
    $: isHome = currentPage === "home";
    $: isCity = currentPage === "city";
    $: isRecycle = currentPage === "recycle";
    $: isAbout = currentPage === "about";
    $: isSettings = currentPage === "settings";
    

</script>

<nav id="navBar">
    <ul>
        <li>
            <a href="/" 
               id="homeLink"
               class:active="{isHome}"
               on:pointerenter={moveMagicCircle}
               on:pointerleave={updateMagicCircle}
               on:focus={moveMagicCircle}
               on:blur={updateMagicCircle}
               on:click={() => setNewPage("home")}
               aria-current={isHome}>
                <span class="visuallyHidden">Home</span>
                <SvgIcon icon="home" ariaHidden="true" />
            </a>
        </li>
        <li>
            <a href="/whyrecycle"
               id="recycleLink"
               class:active="{isRecycle}"
               on:pointerenter={moveMagicCircle}
               on:pointerleave={updateMagicCircle}
               on:focus={moveMagicCircle}
               on:blur={updateMagicCircle}
               on:click={() => setNewPage("recycle")}
               aria-current={isRecycle}>
                <span class="visuallyHidden">Why recycle</span>
                <SvgIcon icon="recycle" ariaHidden="true" />
            </a>
        </li>
        <li>
            <a href="/about"
               id="aboutLink"
               class:active="{isAbout}"
               on:pointerenter={moveMagicCircle}
               on:pointerleave={updateMagicCircle}
               on:focus={moveMagicCircle}
               on:blur={updateMagicCircle}
               on:click={() => setNewPage("about")}
               aria-current={isAbout}>
                <span class="visuallyHidden">About us</span>
                <SvgIcon icon="about" ariaHidden="true" />
            </a>
        </li>
        <li>
            <a href="/settings"
               id="settingsLink"
               class:active="{isSettings}"
               on:pointerenter={moveMagicCircle}
               on:pointerleave={updateMagicCircle}
               on:focus={moveMagicCircle}
               on:blur={updateMagicCircle}
               on:click={() => setNewPage("settings")}
               aria-current={isSettings}>
                <span class="visuallyHidden">Settings</span>
                <SvgIcon icon="settings" ariaHidden="true" />
            </a>
        </li>
        <li>
            <a href="/city/{cityId}"
               id="cityLink"
               bind:this={cityLink}
               class:active="{isCity}"
               class:show="{showCity}"
               tabindex="-1"
               on:pointerenter={moveMagicCircle}
               on:pointerleave={updateMagicCircle}
               on:focus={moveMagicCircle}
               on:blur={updateMagicCircle}
               on:click={() => setNewPage("city")}
               aria-current={isCity}
               aria-hidden="{!showCity}">
                <span class="visuallyHidden">City of {cityName}</span>
                <SvgIcon icon="city" ariaHidden="true" />
            </a>
        </li>
        <!-- magic cirles -->
        <li id="magicCircleVrt" bind:this={magicCircleVrt} aria-hidden="true"></li>
        <li id="magicCircleHrz" bind:this={magicCircleHrz} aria-hidden="true"></li>
    </ul>
</nav>

<style lang="scss">
    #navBar {
        /* variables */
        --nav-pad: 0.4rem;
        --a-size: calc(var(--nav-size) - (2 * var(--nav-pad)));
        --svg-size: 1.5rem;
        /* fixed positioning */
        position: fixed;
        bottom: 0;

        z-index: 10000;

        /* flex to push navigation bar to the bottom */
        display: flex;
        align-items: flex-end;

        ul {
            display: flex;
            flex-flow: column nowrap;
            width: var(--nav-size);
            padding: var(--nav-pad) 0;
            margin-bottom: var(--pad-md);
            margin-left: max(calc((100vw - var(--max-width)) / 2), var(--pad-sm));
            /* z-index */
            position: relative;
            z-index: -2;

            border-radius: 50rem;
            background-color: var(--pageClr-100);

            transition: background-color var(--transition-200) ease-in-out;
        }

        a {
            width: var(--a-size);
            height: var(--a-size);
            margin: 0 auto;
            position: relative;
            /* center icons using flex */
            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50rem;
            overflow: hidden;

            transition: color var(--transition-200) ease-in-out,
                        background-color var(--transition-200) ease-in-out;

            &:hover, &:focus-visible {
                :global(svg) {
                    /* variables */
                    --mainClr: var(--pageClr-0);
                    transition: stroke var(--transition-200) ease-in-out;
                }
            }

            &:focus-visible {
                z-index: 100;
                outline: var(--focus-outline) var(--outlineColor, var(--clr-900));
                outline-offset: 0;
            }

            :global(svg) {
                /* variables */
                --mainClr: var(--pageClr-800);
                width: var(--svg-size);
            }
        }

        #cityLink {
            transform: scale(0);
            width: 0;
            height: 0;

            transition: transform var(--transition-300) var(--transition-smoothEase),
                        width var(--transition-300) var(--transition-smoothEase),
                        height var(--transition-300) var(--transition-smoothEase);
        }

        #cityLink.show {
            transform: scale(1);
            width: var(--a-size);
            height: var(--a-size);
        }

        :global(a.active svg) {
            /* variables */
            --mainClr: var(--pageClr-0);
        }

        :global(#magicCircleVrt.active) {
            position: absolute;
            z-index: -1;
            top: 0;
            left: var(--nav-pad);
            right: var(--nav-pad);
            height: var(--a-size);

            border-radius: 50rem;
            background-color: var(--pageClr-700);

            transition: transform var(--transition-300) var(--transition-smoothEase);
        }

        :global(#magicCircleHrz.active) {
            /* remove horizontal magic circle */
            display: none;

            position: absolute;
            z-index: -1;
            top: var(--nav-pad);
            bottom: var(--nav-pad);
            left: 0;
            width: var(--a-size);

            border-radius: 50rem;
            background-color: var(--pageClr-700);

            transition: transform var(--transition-300) var(--transition-smoothEase);
        }
    }


    /* reduced motion */
    @media (prefers-reduced-motion) {
        :global([data-motion="auto"]) {
            #navBar {
                a {
                    background-color: var(--pageClr-100);

                    &:hover, &:focus-visible {
                        background-color: var(--pageClr-700);
                    }

                    &.active {
                        background-color: var(--pageClr-700);
                    }
                }

                :global(#magicCircleVrt.active) {
                    /* hide vertical magic circle */
                    display: none;
                }

                :global(#magicCircleHrz.active) {
                    /* hide horizontal magic circle */
                    display: none;
                }

                #cityLink {
                    /* add opacity */
                    opacity: 0;
                    /* transition opacity instead of scale and size */
                    transition: opacity var(--transition-300) ease-in-out;
                }

                #cityLink.show {
                    opacity: 1;
                }
            }
        }
    }


    /* no script */
    :global([data-script="false"]) {
        #navBar {
            a {
                &::before {
                    /* ::before pseudo class that slides in as new bg when hovered/focused */
                    width: 100%;
                    height: 100%;
                    content: "";
                    background-color: var(--pageClr-700, var(--clr-700));
                    /* move ::before under main text */
                    position: absolute;
                    z-index: -1;

                    border-radius: 50rem;

                    /* -105% translateX to prevent ::before from peaking thorough */
                    transform: translateY(50%) scale(0);
                    transition: transform var(--transition-300) var(--transition-smoothEase);
                }

                &:hover, &:focus-visible {
                    transform: none;

                    &::before {
                        transform: translateY(0%) scale(1);
                    }
                }

                &.active {
                    /* active link background color as there is no magic cirlce */
                    background-color: var(--pageClr-700);
                }
            }

            :global(#magicCircleVrt.active) {
                /* hide magic circle */
                display: none;
            }
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-tablet) {
        #navBar {
            /* variables */
            --nav-pad: 0.3rem;
            --svg-size: 1.2rem;

            ul {
                margin-bottom: var(--pad-sm);
            }
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        #navBar {
            /* position changes */
            right: 0;
            left: 0;

            ul {
                /* make navigation horizontal */
                flex-flow: row nowrap;
                height: var(--nav-size);
                /* reset width */
                width: auto;
                /* reset padding */
                padding: 0 var(--nav-pad);
                /* margins to center nav and push it slightly away from the bottom */
                margin: 0 auto var(--pad-sm) auto;

                /* add box shadow to separate nav bar from background elements of the same color */
                box-shadow: var(--boxShadow-main) var(--pageClr-700, var(--clr-100));
            }

            a {
                /* reset margins */
                margin: var(--nav-pad) 0;
            }

            #magicCircleVrt {
                /* remove vertical magic circle */
                display: none;
            }

            #magicCircleHrz {
                /* show horizontal magic circle */
                display: block;
            }
        }
    }
</style>