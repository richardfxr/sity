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

    import A11yMenu from '$lib/a11yMenu.svelte';
    import SvgIcon from '$lib/svgIcon.svelte';
    import Button from '$lib/button.svelte';
    import SiteOptCard from '$lib/siteOptCard.svelte';
    import CityCard from '$lib/cityCard.svelte';

    // button options for A11yMenu
    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
    ];

    // options for SiteOptCards
    const siteOptions = [
        {id: "findYourCity", href: "#search", bgColor:"#7BE6F5", title: "Find your city", text: `${cities.length} cities`},
        {id: "about", href: "#", bgColor:"#C4BFFF", title: "About us", text: "What is sity.earth?"},
        {id: "faq", href: "#", bgColor:"#F7B4D6", title: "FAQ", text: "00 questions"},
        {id: "settings", href: "#", bgColor:"#F7E57C", title: "Settings", text: "account and accessibility"},
    ];
</script>



<A11yMenu
    options={a11yMenuOptions}
    --textColorHover="var(--clr-0)"
    --menuBgColor="var(--clr-100)"
    --bgColor="var(--clr-150)"
    --bgColorHover="var(--clr-700)"
    --bgColorTransition="var(--clr-250)"/>

<main id="main">
    <div class="twoCol maxWidth" id="intro">

        <div class="hero">

            <div class="header">
                <SvgIcon icon="logotype"/>
                <!-- tablet/mobile user auth buttons -->
                <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>

            </div>

            <h1>Recycling<br>— <span class="accent">demystified</span></h1>
            <p>A visual tour of the recycling journey - when to recycle, how to recycle, and where the recycling goes. <a href="#search">Find your city</a> to get started.</p>
        </div>

        <div class="content">
            <div class="header">
                <!-- desktop user auth buttons -->
                <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
            </div>
            <ul class="contentGrid siteOpt">
                {#each siteOptions as siteOption}
                <li>
                    <SiteOptCard {...siteOption} />
                </li>
                {/each}
            </ul>
        </div>
    </div>

    <div class="twoCol maxWidth" id="search">
        <div class="search">
            <div class="searchBar">Search bar place holder</div>
            <!-- desktop/tablet button -->
            <Button type="link" text="Why ask for my city?" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
        </div>

        <!-- mobile button -->
        <Button type="link" text="Why ask for my city?" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>

        <ul class="contentGrid cities">
            {#each cities as city}
                <li>
                    <CityCard {...city} />
                </li>
            {/each}
        </ul>
    </div>
</main>


<style lang="scss">
    :global(html, body) {
        background-color: var(--clr-50);
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
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-smdesktop) {
    }

    @media only screen and (max-width: 960px) {
        .siteOpt {
            width: min(100%, calc(2 * 13rem + 3 * var(--pad-sm)));
            grid-template-columns: repeat(2, 1fr);

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
</style>
