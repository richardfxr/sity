<script>
    /* === IMPORTS ============================ */
    import { page } from '$app/stores';
    import { onMount, tick } from 'svelte';
    import { hasCity, defaultCity, defaultCityName } from '../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';
    // SVGs
    import HomeIcon from '$lib/SVGs/homeIcon.svelte';
    import CityIcon from '$lib/SVGs/cityIcon.svelte';
    import RecycleIcon from '$lib/SVGs/recycleIcon.svelte';
    import AboutIcon from '$lib/SVGs/aboutIcon.svelte';
    import SettingsIcon from '$lib/SVGs/settingsIcon.svelte';

    /**CSS varaible props
     * --pageClr-800 - icon default color
     * --pageClr-700 - naviga=ion link hover background color
     * --pageClr-100 - navigation bar background color
     * --pageClr-0 - icon hover and focus-visible color
     */



    /* === DECLARATIONS ======================= */
    let navBarUl;
    let magicCircleVrt;
    let magicCircleHrz;



    /* === LIFECYCLE HOOKS ==================== */
    onMount(() => {
        // set initial position for magic circle
        moveMagicCircle();

        // create ResizeObserver to observe navBar size changees
        const navSizeObserver = new ResizeObserver(() => moveMagicCircle());
        navSizeObserver.observe(navBarUl);
    });



    /* === REACTIVE DECLARATIONS ============== */
    $: if($page.url.pathname) moveMagicCircle(); // call moveMagicCircle() on pathname change
    
    // reactive declarations to apply active class to links
    $: isHome = $page.url.pathname === "/";
    $: isCity = $page.url.pathname.startsWith("/city");
    $: isRecycle = $page.url.pathname === "/whyrecycle";
    $: isAbout = $page.url.pathname === "/about";
    $: isSettings = $page.url.pathname === "/settings";



    /* === EVENT HANDLERS ===================== */
    /**
     * Updates magic circle translateX and translateY so that it moves to a.active
     */
    async function moveMagicCircle() {
        // returns if currentPage or magic circles are falsy
        if (!magicCircleVrt || !magicCircleHrz) return;

        // get active link on next tick (when class update is applied)
        await tick();
        let activeLink = document.querySelector(`#navBar a.active`);

        if (activeLink) {
            setMagicCircleVrtTo(activeLink.offsetTop);
            setMagicCircleHrzTo(activeLink.offsetLeft);
        };
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
</script>

<nav id="navBar">
    <ul bind:this={navBarUl}>
        <li>
            <a href="/" 
               id="homeLink"
               class:active={isHome}
               aria-current={isHome}>
                <span class="visuallyHidden">Home</span>
                <HomeIcon />
            </a>
        </li>
        <li>
            <a href="/city/{$defaultCity}"
               id="cityLink"
               class:active={isCity}
               class:show={$hasCity}
               tabindex={$hasCity ? "0" : "-1"}
               aria-current={isCity}>
               <span class="visuallyHidden">City of {$defaultCityName}</span>
               <CityIcon />
            </a>
        </li>
        <li>
            <a href="/whyrecycle"
               id="recycleLink"
               class:active={isRecycle}
               aria-current={isRecycle}>
                <span class="visuallyHidden">Why recycle</span>
                <RecycleIcon />
            </a>
        </li>
        <li>
            <a href="/about"
               id="aboutLink"
               class:active={isAbout}
               aria-current={isAbout}>
                <span class="visuallyHidden">About us</span>
                <AboutIcon />
            </a>
        </li>
        <li class="last">
            <a href="/settings"
               id="settingsLink"
               class:active={isSettings}
               aria-current={isSettings}>
                <span class="visuallyHidden">Settings</span>
                <SettingsIcon />
            </a>
        </li>
        <!-- magic cirles -->
        <li id="magicCircleVrt" bind:this={magicCircleVrt} aria-hidden="true"></li>
        <li id="magicCircleHrz" bind:this={magicCircleHrz} aria-hidden="true"></li>
    </ul>
</nav>

<style lang="scss">
    #navBar {
        /* internal variables */
        --margin-bottom: var(--pad-md);
        --icon-size: min(1.6rem * var(--fontSize-multiplier), 38.4px);
        --icon-hover-scale: 1.2;
        --link-pad: calc(var(--pad-sm) + var(--inputSize-adjust));
        --indicator-size: min(0.5rem * var(--fontSize-multiplier), 12px);

        /* fixed positioning */
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 10000;
        /* flex to push navigation bar to the bottom */
        display: flex;

        overflow: auto;

        ul {
            position: relative;
            z-index: -2;
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
            
            width: var(--nav-size);
            padding: var(--pad-xxs);
            margin: auto
                    0
                    var(--margin-bottom)
                    max(calc((100vw - var(--max-width)) / 2), var(--pad-sm));
            border-radius: calc(var(--border-radius) + var(--pad-xxs));
            background-color: var(--clr-0);

            transition: background-color var(--transition-200) ease-in-out;
        }

        a {
            display: flex;
            flex-direction: row;
            align-items: center;

            width: 100%;
            padding: var(--link-pad) 0;
            border-radius: var(--border-radius);
            margin: calc(var(--pad-xxxs) / 2) 0;

            transition: color var(--transition-200) ease-in-out,
                        background-color var(--transition-200) ease-in-out;

            &::after {
                content: '';
                display: block;
                
                width: var(--indicator-size);
                height: var(--indicator-size);
                margin-right: var(--pad-xxs);
                border-radius: var(--border-radius-round);
                background-color: var(--pageClr-400);

                opacity: 0;

                transition: opacity var(--transition-200) ease-in-out;
            }

            :global(svg) {
                width: calc(var(--icon-size) + var(--pad-xs));
                padding-left: var(--pad-xs);
                margin-right: auto;
                margin-left: auto;

                transition: transform var(--transition-200) var(--transition-smoothEase);
            }

            &:hover, &:focus, &:focus-visible {
                :global(svg) {
                    transform: scale(var(--icon-hover-scale));
                }
            }

            &:active {
                :global(svg) {
                    transform: scale(var(--icon-hover-scale)) translateY(var(--active-translate-sm));
                }
            }

            &.active{
                &::after {
                    opacity: 1;

                    transition: opacity var(--transition-200) ease-in-out var(--transition-300);
                }
            }
        }

        #cityLink {
            transform: scale(0);
            width: 0;
            height: 0;
            padding: 0;
            margin: 0;

            transition: transform var(--transition-300) var(--transition-smoothEase),
                        width var(--transition-300) var(--transition-smoothEase),
                        height var(--transition-300) var(--transition-smoothEase),
                        padding var(--transition-300) var(--transition-smoothEase),
                        margin var(--transition-300) var(--transition-smoothEase);

            &.show {
                transform: scale(1);
                width: 100%;
                height: calc(var(--link-pad) * 2 + var(--icon-size));
                padding: var(--link-pad) 0;
                margin: calc(var(--pad-xxxs) / 2) 0;
            }
        }

        :global(.icon--border) {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 3px;
        }

        #magicCircleVrt {
            position: absolute;
            z-index: -1;
            top: 0;
            left: var(--pad-xxs);
            right: var(--pad-xxs);
            height: calc(var(--link-pad) * 2 + var(--icon-size));

            border-radius: var(--border-radius);
            background-color: var(--pageClr-100);

            transition: background-color var(--transition-200) ease-in-out,
                        transform var(--transition-300) var(--transition-smoothEase);
        }

        #magicCircleHrz {
            /* remove horizontal magic circle */
            display: none;

            position: absolute;
            z-index: -1;
            top: var(--pad-xxs);
            bottom: calc(var(--pad-xxs) + env(safe-area-inset-bottom));
            left: 0;
            width: calc(var(--link-pad) * 2 + var(--icon-size));

            border-radius: var(--border-radius);
            background-color: var(--pageClr-100);

            transition: background-color var(--transition-200) ease-in-out,
                        transform var(--transition-300) var(--transition-smoothEase);
        }
    }



    /* === BREAKPOINTS ======================== */
    @media (orientation: portrait) {
        #navBar {
            /* position changes */
            top: unset;
            right: 0;
            left: 0;

            background-color: var(--clr-0);
            box-shadow: 0 0 15px 4px var(--clr-0); /* shadow to indicate scroll */

            ul {
                /* make navigation horizontal */
                flex-flow: row nowrap;
                
                width: unset;
                height: calc(0.9 * var(--nav-size) + env(safe-area-inset-bottom));
                padding: calc(var(--pad-xxs)) 0 calc(var(--pad-xxs) + env(safe-area-inset-bottom)) 0;
                border-radius: 0;
                margin: 0 auto;
                background-color: unset;

                li:first-child {
                    padding-left: var(--pad-sm);
                }

                li.last {
                    padding-right: var(--pad-sm);
                }
            }

            a {
                flex-direction: column;

                height: 100%;
                width: unset;
                padding: 0 var(--link-pad);
                margin: 0;

                &::after {
                    margin-right: 0;
                    margin-bottom: var(--pad-xxs);
                }

                :global(svg) {
                    width: unset;
                    height: calc(var(--icon-size) + var(--pad-xxxs));
                    padding-top: var(--pad-xxxs);
                    padding-left: 0;
                    margin-top: auto;
                    margin-bottom: auto;
                }
            }

            #cityLink.show {
                transform: scale(1);
                height: 100%;
                width: unset;
                padding: 0 var(--link-pad);
                margin: 0 calc(var(--pad-xxxs) / 2);
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

    @media only screen and (max-width: $breakpoint-tablet) {
        #navBar {
            /* internal variables */
            --margin-bottom: var(--pad-sm);
            --icon-size: min(1.5rem * var(--fontSize-multiplier), 34.5px);
            --link-pad: calc(var(--pad-sm) + var(--inputSize-adjust));
            --indicator-size: min(0.45rem * var(--fontSize-multiplier), 10.35px);
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        #navBar {
            // /* internal variables */
            // --margin-bottom: var(--pad-sm);
            // --icon-size: min(1.5rem * var(--fontSize-multiplier), 34.5px);
            // --link-pad: calc(var(--pad-sm) + var(--inputSize-adjust));
            // --indicator-size: min(0.45rem * var(--fontSize-multiplier), 10.35px);
        }
    }



    /* === A11Y =============================== */
    /* forced colors */
    @media (forced-colors: active) {
        #navBar {
            a {
                &::after {
                    background-color: ActiveText;
                }

                &:visited {
                    :global(.icon--border) {
                        stroke: VisitedText;
                    }
                }
                
                &.active {
                    outline: var(--border-main) ActiveText;

                    :global(.icon--border) {
                        stroke: ActiveText;
                    }

                    &::after {
                        transition: opacity var(--transition-200) ease-in-out;
                    }
                }
            }

            :global(.icon--border) {
                stroke-width: 4.5px;
            }
        }
    }

    /* reduced motion */
    :global([data-motion="low"]) {
        #navBar {
            /* internal variables */
            --icon-hover-scale: 1;

            a {
                &:hover, &:focus, &:focus-visible {
                    outline: var(--border-main) var(--clr-600);
                }

                &.active {
                    background-color: var(--pageClr-100);

                    &::after {
                        transition: opacity var(--transition-200) ease-in-out;
                    }
                }
            }

            #magicCircleVrt, #magicCircleHrz {
                /* hide magic circles */
                display: none;
            }
        }
    }

    @media (prefers-reduced-motion) {
        :global([data-motion="auto"]), :global([data-motion="low"]) {
            #navBar {
                /* internal variables */
                --icon-hover-scale: 1;

                a {
                    &:hover, &:focus, &:focus-visible {
                        outline: var(--border-main) var(--clr-600);
                    }

                    &.active {
                        background-color: var(--pageClr-100);

                        &::after {
                            transition: opacity var(--transition-200) ease-in-out;
                        }
                    }
                }

                #magicCircleVrt, #magicCircleHrz {
                    /* hide magic circles */
                    display: none;
                }
            }
        }
    }

    /* no script */
    :global([data-script="false"]) {
        #navBar {
            a {
                &.active {
                    background-color: var(--pageClr-100);
                }
            }

            #magicCircleVrt, #magicCircleHrz {
                /* hide magic circles */
                display: none;
            }
        }
    }
</style>