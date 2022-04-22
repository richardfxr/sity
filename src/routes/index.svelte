<script context="module">
    // following code runs on both server and client

    import { getDbDocs } from '../firebase/firestore';

    export async function load({ params, fetch, session, stuff }) {
        // get Firestore database
        const db = stuff.db

        // get all docs from 'cities' collection
        const cities = await getDbDocs(db, "cities");

        return {
            props: {
                cities
            }
        };
    }
</script>

<script>
    // props
    export let cities = null;

    // imports
    import { onMount } from 'svelte';
    import { onPageLoad } from '$lib/page.js';
    import { curPage } from '../store/store.js';
    import Illustration from '$lib/illustration.svelte';
    import SvgIcon from '$lib/svgIcon.svelte';
    import Button from '$lib/button.svelte';
    import SiteOptCard from '$lib/siteOptCard.svelte';
    import CityCard from '$lib/cityCard.svelte';

    // options for SiteOptCards
    const siteOptions = [
        {id: "findYourCity", href: "#search", bgColor:"var(--clr-siteOpt-blue-250)", bgColorHover:"var(--clr-siteOpt-blue-350)", title: "Find your city", text: `${cities.length} cities`},
        {id: "recycle", href: "/whyrecycle", bgColor:"var(--clr-siteOpt-purple-250)", bgColorHover:"var(--clr-siteOpt-purple-350)", title: "Why recycle?", text: "how recycling works"},
        {id: "about", href: "/about", bgColor:"var(--clr-siteOpt-pink-250)", bgColorHover:"var(--clr-siteOpt-pink-350)", title: "About us", text: "what is sity.earth?"},
        {id: "settings", href: "/settings", bgColor:"var(--clr-siteOpt-yellow-250)", bgColorHover:"var(--clr-siteOpt-yellow-350)", title: "Settings", text: "account and accessibility"},
    ];

    // bindings
    let scrollY;
    let windowWidth
    let windowHeight;
    let pageHeading;

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("home", $curPage, pageHeading);
	});

    /* === REACTIVE DECLARATIONS ============== */
    let scrollLimit = 0.8;
    $: isMobile = windowWidth <= 650 ? true  : false;
    $: scrollYRatio = scrollY / windowHeight;
    // scroll variable used for .heroIllus
    $: scrollYInv = scrollYRatio / scrollLimit < 1 ? 1 - (scrollYRatio / scrollLimit)  : 0;
    // same as scrollYInv except on mobile, where it becomes 0
    $: scrollYInvMobile = isMobile ? 0  : scrollYInv;
</script>


<svelte:window bind:scrollY={scrollY} bind:innerHeight={windowHeight} bind:innerWidth={windowWidth}/>


<div id="heroIllus">
    <div class="container">
        <div class="normalWidth">
            <!-- transforms: translateX and translateY centers main when on top of page -->
            <div class="main" style="transform: scale({1 + scrollYInv}) translateX(calc((-1 * {scrollYInvMobile} * ((var(--nav-size) + var(--pad-md)) / 2)) / {1 + scrollYInvMobile})) translateY(calc(-6.5 * {scrollYInv}vh))">

                <!-- logotype -->
                <SvgIcon icon="logotype-border"/>

                <!-- vortex layers -->
                <div class="vortex vortex-2">
                    <!-- layer 2 -->
                    <Illustration illus="pizzaBox-dirty" clr1="brown" clr2="offWhite" ariaHidden={true} />
                    <Illustration illus="metalCan-default" clr1="orange" clr2="silverWarm" ariaHidden={true} />
                    <Illustration illus="cardboardBox-closed" clr1="brown" clr2="offWhite" clr3="red" ariaHidden={true} />
                </div>
                <div class="vortex vortex-1">
                    <!-- layer 1 -->
                    <Illustration illus="plasticBottle-default" clr1="brown" clr2="offWhite" ariaHidden={true} />
                    <Illustration illus="glassCup-empty" clr1="skyBlueTransparent" ariaHidden={true} />
                    <Illustration illus="carton-default" clr1="skyBlue" clr2="offWhite" ariaHidden={true} />
                </div>

                <div class="shadow__container">
                    <div class="shadow" style="transform: translateY(calc(var(--mainHeight) * 0.95 - var(--border-radius) + ((var(--mainHeight) * {scrollYInv}) / 20)))"></div>
                </div>
                
                <div class="textCard" style="transform: translateY(calc({scrollYInv}* (-1 * var(--mainHeight))))">
                    <span class="text--h1">Where does it all go?</span>
                    <div class="handles">
                        <!-- left bin handle -->
                        <Illustration illus="binHandle-left" clr1="main" ariaHidden={true} />
                        <!-- right bin handle -->
                        <Illustration illus="binHandle-right" clr1="main" ariaHidden={true} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="twoCol normalWidth" id="intro" aria-labelledby="pageHeading">

    <div class="hero">

        <div class="header">
            <SvgIcon icon="logotype"/>
        </div>

        <h1 id="pageHeading" bind:this={pageHeading} tabindex="-1">Recycling<br>— <span class="accent">demystified</span></h1>
        <p>A visual tour of the recycling journey - when to recycle, how to recycle, and where the recycling goes.</p>
    </div>

    <div class="content">
        <ul class="contentGrid siteOpt" aria-label="Website options">
            {#each siteOptions as siteOption}
            <li>
                <SiteOptCard {...siteOption} />
            </li>
            {/each}
        </ul>
    </div>
</div>

<div class="twoCol normalWidth" id="search" role="region" aria-labelledby="searchHeading">
    <!-- heading for screen readers -->
    <h2 id="searchHeading" class="visuallyHidden">Search for your city</h2>

    <div class="search">
        <div class="searchBar">Search bar place holder</div>
        <!-- desktop/tablet button -->
        <Button type="link" text="Why ask for my city?" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
    </div>

    <!-- mobile button -->
    <Button type="link" text="Why ask for my city?" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>

    <ul class="contentGrid cities" aria-label="Cities">
        {#each cities as city}
            <li>
                <CityCard {...city} />
            </li>
        {/each}
    </ul>
</div>


<style lang="scss">
    :global(html, body) {
        /* page variables */
        --pageClr-800: var(--clr-800);
        --pageClr-700: var(--clr-700);
        --pageClr-600: var(--clr-600);
        --pageClr-250: var(--clr-250);
        --pageClr-150: var(--clr-150);
        --pageClr-100: var(--clr-100);
        --pageClr-50: var(--clr-50);
        --pageClr-0: var(--clr-0);

        background-color: var(--pageClr-50);
    }

    #heroIllus {
        height: 150vh;
        width: 100%;

        /* center .container within */
        display: flex;
        justify-content: center;

        /* padding so .main does not hit very bottom and get cut off by contain: paint */
        padding-bottom: var(--pad-md);

        /* remove gap between #heroIllus and #intro */
        margin-bottom: calc(-1 * var(--pad-xxl));

        .container {
            /* sticky positioning */
            position: sticky;
            top: 0;
            right: 0;
            left: 0;

            display: flex;
            align-items: flex-end;
            justify-content: center;

            width: 100vw;
            // width: 100%;
            height: 100vh;

            /* prevent overflow from scaling */
            overflow: hidden;

            .main {
                /* variables */
                /* --scrollYInv assigned in-line by Svelte */
                --mainHeight: 75vh;
                --borderWidth: 0;
                --vortexScale: 1;
                
                /* sizing */
                // width: 100%;
                height: var(--mainHeight);
                
                /* border */
                border: solid var(--clr-stroke) var(--borderWidth);
                border-radius: var(--border-radius);

                background-color: var(--pageClr-250);

                will-change: transform;

                :global(.logotype) {
                    width: 20%;

                    /* center logotye */
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    z-index: 500;

                    /* scale along with vortex */
                    transform: scale(var(--vortexScale));
                }

                .vortex {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    :global(.illus) {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                    }

                    &-2 {
                        z-index: 499;
                        animation: rotateForever 23s linear infinite;

                        :global(svg:nth-child(1)) {
                            width: 25%;
                            padding: 18% 0 0 4%;
                            transform: rotate(250deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(2)) {
                            width: 5%;
                            padding: 18% 0 0 0;
                            transform: rotate(84deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(3)) {
                            width: 28%;
                            padding: 27% 0 0 10%;
                            transform: rotate(11deg) scale(var(--vortexScale));
                        }
                    }

                    &-1 {
                        z-index: 499;
                        animation: rotateForever 30s linear infinite;

                        :global(svg:nth-child(1)) {
                            width: 20%;
                            padding: 0 20% 30% 0;
                            transform: rotate(28deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(2)) {
                            width: 17%;
                            padding: 32% 0 0 10%;
                            transform: rotate(69deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(3)) {
                            width: 20%;
                            padding: 30% 0 0 10%;
                            transform: rotate(320deg) scale(var(--vortexScale));
                        }
                    }
                }

                .shadow {
                    /* z-index to cover vortex illustrations */
                    position: relative;
                    z-index: 501;
                    width: 100%;
                    height: 100%;
                    background-color: var(--clr-600);

                    &__container {
                        width: 100%;
                        height: 100%;

                        border-radius: var(--border-radius);
                        overflow: hidden;
                    }
                }

                .textCard {
                    /* take up all of .main with space at bottom */
                    width: calc(100% + 2 * var(--borderWidth));
                    height: 95%;
                    /* overlap borders */
                    margin: 0 calc(-1 * var(--borderWidth));

                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 502;

                    /* flexbox to center span */
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: center;

                    border: solid var(--clr-stroke) var(--borderWidth);
                    border-radius: var(--border-radius);
                    overflow: hidden;

                    background-color: var(--pageClr-100);

                    will-change: transform;

                    span {
                        padding: 0 var(--pad-lg);
                        text-align: center;
                        font-size: min(4.5vw, calc(var(--max-width) * 0.045));
                    }

                    .handles {
                        /* position handles to bottom of .textCard */
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        left: 0;

                        /* flexbox to push handle to sides */
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        height: 14rem;
                        padding: 0 2rem 2rem 2rem;

                        :global(.illus) {
                            height: 100%;
                        }
                    }
                }
            }

            
        }
    }

    #intro {
        /* bottom padding to compoensate for SiteOptCards top offset */
        padding-bottom: var(--pad-xl);

        .content {
            .siteOpt {
                li {
                    &:nth-child(even) {
                        position: relative;
                        top: var(--pad-xl);
                    }
                }

                h2 {
                    font-family: 'Lexend Deca', sans-serif;
                    font-size: 1.3rem;
                    font-weight: 600;
                    line-height: 1.7em;
                    text-align: center;
                    color: var(--clr-800);
                }
            }
        }
    }

    #search {
        padding-bottom: var(--pad-xxl);

        .search {
            height: 100%;
            padding-top: var(--pad-md);

            .searchBar {
                position: sticky;
                top: var(--pad-md);
                width: 100%;
                padding: 1rem 1.2rem;
                border-radius: 3rem;
                background-color: var(--clr-0);
            }
        }

        :global(.button) {
            /* hide mobile "Why ask for my city?" button */
            display: none;
        }

        .cities {
            padding-top: var(--pad-md);
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-smdesktop) {
        #heroIllus {
            .container {
                .main {
                    .textCard {
                        .handles {
                            height: 12rem;
                            padding: 0 1.5rem 1.5rem 1.5rem;
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 960px) {
        .siteOpt {
            #about, #faq, #settings {
                /* reset individual card margins */
                margin-top: 0;
            }

            #about, #settings {
                /* offset second column */
                position: relative;
                top: 5rem;
            }
        }
    }

    @media only screen and (max-width: $breakpoint-tablet) {
        #heroIllus {
            .container {
                .main {
                    .textCard {
                        span {
                            font-size: min(7vw, calc(var(--max-width) * 0.07));
                        }

                        .handles {
                            height: 8rem;
                            padding: 0 1rem 1rem 1rem;
                        }
                    }
                }
            }
        }

        #search {
            .cities {
                /* remove top padding */
                padding-top: 0;
            }
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        #heroIllus {
            .container {
                .main {
                    /* variables */
                    --vortexScale: 2;

                    .textCard {
                        span {
                            padding: 0 var(--pad-md);
                            font-size: min(10vw, calc(var(--max-width) * 0.10));
                        }

                        .handles {
                            height: 8rem;
                            padding: 0 0.75rem 0.75rem 0.75rem;
                        }
                    }
                }
            }
        }
    }
</style>
