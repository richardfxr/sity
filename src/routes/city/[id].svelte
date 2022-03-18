<script context="module">
    import { getDbDoc, getDbDocFromRef } from "../../firebase/firestore";

    export async function load({ params, fetch, session, stuff }) {
        // get city id
        let id = params.id;
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
    import A11yMenu from '$lib/a11yMenu.svelte';
    import SvgIcon from '$lib/svgIcon.svelte';
    import Button from '$lib/button.svelte';
    import SvgShape from "$lib/svgShape.svelte";
    import {copyURL} from '$lib/clipboard.js';

    // button options for A11yMenu
    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
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
                <div class="userAuth">
                    <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                    <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                </div>
            </div>

            <h1>Recycling in <br><span class="accent">{city.name}, {city.state}</span></h1>
        </div>

        <div class="content">
            <div class="header">
                <!-- desktop user auth buttons -->
                <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
            </div>

            <ul class="contentGrid cityOpt">
                <li class="guidelines">
                    <a href="#guidelines" target="_blank" class="cityOptCard">
                        <!-- SVG shapes -->
                        <SvgShape shape="Plastic" --bgColor="var(--clr-plastic-150)" />
                        <SvgShape shape="Cardboard" --bgColor="var(--clr-cardboard-150)" />
                        <SvgShape shape="Metal" --bgColor="var(--clr-metal-150)" />
                        <SvgShape shape="Glass" --bgColor="var(--clr-glass-150)" />
                        <SvgShape shape="Paper" --bgColor="var(--clr-paper-150)" />
                        
                        <h2>City guidelines</h2>
                        <p class="text--xs">{guideline.categories.length} categories</p>
                    </a>
                </li>
                <li class="share">
                    <Button type="button" style="lg--icon" icon="share" text="Share this page" on:click={copyURL} --inlineSize="auto" --textColor="var(--clr-900)" --textColorHover="var(--clr-0)" --bgColor="var(--clr-100)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                    <Button type="button" style="lg--icon" icon="share" text="Share" on:click={copyURL} --inlineSize="auto" --textColor="var(--clr-900)" --textColorHover="var(--clr-0)" --bgColor="var(--clr-100)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                </li>
                <li  class="facility">
                    <a href={guideline.link} target="_blank" class="cityOptCard">
                        <SvgIcon icon="arrowTopRight" --mainClr="var(--clr-900)" />
                        <p class="text--xs">Recycling processed by</p>
                        <h2>{guideline.name}</h2>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</main>

<style lang="scss">
    :global(html, body) {
        background-color: var(--clr-50);
    }

    .cityOpt {
        display: grid;
        grid-template: 
            "guidelines facility" 23rem
            "share facility" 5rem
            / 1fr 1fr;

        &Card {
            display: flex;
            flex-flow: column nowrap;
            gap: var(--pad-xxs);
            padding: var(--pad-main);
            background-color: var(--clr-100);

            /* round corners and prevent overflow */
            border-radius: var(--border-radius);
            overflow: hidden;

            /* relative position for .svgShape */
            position: relative;                

            h2 {
                color: var(--clr-900);
            }

            p {
                color: var(--clr-900);
                opacity: 0.85;
            }
        }

        .guidelines {
            grid-area: guidelines;

            a {
                height: 100%;
                /* push text to bottom of card */
                justify-content: flex-end;
            }

            // SvgShape positioning
            :global(.svgShape) {
                position: absolute;
            }

            :global(.plastic) {
                width: 45%;
                transform: rotate(50deg);
                top: 13%;
                left: 67%;
            }

            :global(.cardboard) {
                width: 46%;
                top: -13%;
                left: 45%;
            }

            :global(.metal) {
                width: 40%;
                transform: rotate(110deg);
                top: 13%;
                left: -14%;
            }

            :global(.glass) {
                width: 45%;
                transform: rotate(50deg);
                top: -15%;
                left: 11%;
            }

            :global(.paper) {
                width: 49%;
                transform: rotate(-20deg);
                top: -4%;
                left: 18%;
            }
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

            a {
                margin-top: auto;
            }

            :global(svg) {
                width: 2rem;
                margin-left: auto;
                padding-bottom: 2rem;
            }
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

            .facility {
                :global(svg) {
                    width: 6vw;
                    padding-bottom: 7vw;
                }
            }
        }
    }
</style>