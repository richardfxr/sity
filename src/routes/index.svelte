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
    /* === PROPS ============================== */
    export let cities = null;

    /* === IMPORTS ============================ */
    import { onMount } from 'svelte';
    import { onPageLoad } from '$lib/page.js';
    import { curPage } from '../store/store.js';
    import HeroIllus from '$lib/heroIllus.svelte';
    import SvgIcon from '$lib/svgIcon.svelte';
    import Button from '$lib/button.svelte';
    import SiteOptCard from '$lib/siteOptCard.svelte';
    import CityCard from '$lib/cityCard.svelte';

    /* === CONSTANTS ========================== */
    // options for SiteOptCards
    const siteOptions = [
        {id: "findYourCity", href: "#search", bgColor:"var(--clr-siteOpt-blue-250)", bgColorHover:"var(--clr-siteOpt-blue-350)", title: "Find your city", text: `${cities.length} cities`},
        {id: "recycle", href: "/whyrecycle", bgColor:"var(--clr-siteOpt-purple-250)", bgColorHover:"var(--clr-siteOpt-purple-350)", title: "Why recycle?", text: "how recycling works"},
        {id: "about", href: "/about", bgColor:"var(--clr-siteOpt-pink-250)", bgColorHover:"var(--clr-siteOpt-pink-350)", title: "About us", text: "what is sity.earth?"},
        {id: "settings", href: "/settings", bgColor:"var(--clr-siteOpt-yellow-250)", bgColorHover:"var(--clr-siteOpt-yellow-350)", title: "Settings", text: "account and accessibility"},
    ];

    /* === BINDINGS =========================== */
    let pageHeading;

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("home", $curPage, pageHeading, "default");
	});
</script>


<svelte:head>
	<title>Sity: recycling demystified</title>
</svelte:head>


<HeroIllus />

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
        #search {
            .cities {
                /* remove top padding */
                padding-top: 0;
            }
        }
    }
</style>
