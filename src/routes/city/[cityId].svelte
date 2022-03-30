<script context="module">
    import { getDbDoc, getDbDocFromRef } from "../../firebase/firestore";

    export async function load({ params, fetch, session, stuff }) {
        // get city id
        let id = params.cityId;
        // get Firestore database
        const db = stuff.db
        // declare variables
        let loaded;
        let city;
        let guideline;

        // retrieve data from Firestore
        try {
            // get city document data
            city = await getDbDoc(db, "cities", id);
            // get city guideline
            guideline = await getDbDocFromRef(city.guideline);

            // set loaded to true
            loaded = true;
        } catch(error) {
            // set loaded to false
            loaded = false;
            // log error
            console.error(error.message);
        }
        

        return {
            props: {
                loaded,
                id,
                city,
                guideline
            }
        };
    }
</script>

<script>
    // props
    export let loaded = false;
    export let id;
    export let city;
    export let guideline;

    // imports
    import { curPage, hasCity, defaultCity } from '../../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';
    import CityOptCard from '$lib/cityOptCard.svelte';
    import Button from '$lib/button.svelte';
    import {copyURL} from '$lib/clipboard.js';

    // set curPage
    curPage.set("city");
    // set city
    hasCity.set(true);
    defaultCity.set(id);

    // button options for A11yMenu
    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
    ];
</script>


<main id="main">
    <div class="twoCol maxWidth" id="intro">
        <div class="hero">

            <div class="header">
                <a href="/">
                    <SvgIcon icon="logotype"/>
                </a>
            </div>

            <h1>Recycling in <br><span class="accent">{city.name}, {city.state}</span></h1>
        </div>

        <div class="content">
            <ul class="contentGrid cityOpt">
                <li class="guidelines">
                    <CityOptCard id="guidelines" guidelineLength={guideline.categories.length} />
                </li>
                <li class="share">
                    <Button type="button" style="lg--icon" icon="share" text="Share this page" on:click={copyURL} --inlineSize="auto" --textClr="var(--clr-900)" --textClrHover="var(--clr-0)" --bgClr="var(--clr-100)" --bgClrHover="var(--clr-700)" --bgClrTransition="var(--clr-250)"/>
                    <Button type="button" style="lg--icon" icon="share" text="Share" on:click={copyURL} --inlineSize="auto" --textClr="var(--clr-900)" --textClrHover="var(--clr-0)" --bgClr="var(--clr-100)" --bgClrHover="var(--clr-700)" --bgClrTransition="var(--clr-250)"/>
                </li>
                <li  class="facility">
                    <CityOptCard id="facility" href={guideline.link} facilityName={guideline.name} />
                </li>
            </ul>
        </div>
    </div>

    <div class="placeholder"></div>
</main>

<style lang="scss">
    :global(html, body) {
        /* page variables */
        --pageClr-800: var(--clr-800);
        --pageClr-700: var(--clr-700);
        --pageClr-250: var(--clr-250);
        --pageClr-150: var(--clr-150);
        --pageClr-100: var(--clr-100);
        --pageClr-0: var(--clr-0);

        background-color: var(--clr-50);
    }

    .cityOpt {
        display: grid;
        grid-template: 
            "guidelines facility" 23rem
            "share facility" 5rem
            / 1fr 1fr;

        .guidelines {
            grid-area: guidelines;
        }

        .share {
            grid-area: share;

            :global(div:last-child) {
                :global(.button) {
                    /* hide mobile share button */
                    display: none; 
                }
            }
        }

        .facility {
            grid-area: facility;
            /* align facility to the bottom */
            display: flex;
            justify-content: flex-end;
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-mobile) {
        .cityOpt {
            grid-template: 
                "guidelines facility" 50vw
                "share facility" 13vw
                / 1fr 1fr;
            
            .share {
                :global(div:last-child) {
                    :global(.button) {
                        /* hide desktop share this page button */
                        display: flex; 
                    }
                }

                :global(div:first-child) {
                    :global(.button) {
                        /* show mobile share button */
                        display: none; 
                    }
                }
            }
        }
    }
</style>