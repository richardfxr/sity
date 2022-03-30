<script context="module">
    // following code runs on both server and client

    import { initFirebase } from '../firebase/init';
    import { getDb } from '../firebase/firestore';

    console.log("should be able to see this");

    export async function load({ url, params, fetch, session, stuff }) {
        // initialize Firebase
        await initFirebase();

        // get Firestore database
        const db = await getDb();

        return {
            stuff: {
                db
            },

            props: {
                url
            }
        }
    }
</script>

<script>
    // imports
    import A11yMenu from '$lib/a11yMenu.svelte';
    import NavBar from '$lib/navBar.svelte';
    import { fly } from 'svelte/transition';

    // props
    export let url = "";

    // button options for A11yMenu
    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
    ];

    // page transition parameter
    let pageTransitionDuration = 300;   
    let flyAmount = 0;
    $: flyAmountNeg = -1 * flyAmount;
    
</script>

<!-- accessibility menu -->
<A11yMenu options={a11yMenuOptions} />

<div class="wrapper">
    <!-- navigation bar -->
    <div class="navWrapper">
        <NavBar />
    </div>

    <!-- page transition -->
    {#key url.pathname}
        <div class="mainWrapper" in:fly="{{ y: flyAmount, duration: pageTransitionDuration, delay: pageTransitionDuration }}" out:fly="{{ y: flyAmountNeg, duration: pageTransitionDuration }}">
            <slot />
        </div>
    {/key}
</div>


<style lang="scss">
    .wrapper {
        display: flex;
        flex-flow: row nowrap;
        gap: var(--pad-md);

        /* limit max width and center everything */
        max-width: var(--max-width);
        padding: 0 var(--pad-sm);
        margin: 0 auto;

        .navWrapper {
            position: relative;
            z-index: 10000;
        }

        .mainWrapper {
            width: 100%;
        }
    }

    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-mobile) {
        .wrapper {
            /* fixed navigation at the bottom of the screen */
            flex-flow: column nowrap;

            .navWrapper {
                /* fixed to bottom of viewport */
                position: fixed;
                right: 0;
                bottom: 0;
                left: 0;

                /* add background color to block out content underneath */
                // background-color: var(--pageClr-50);
            }
        }
    }
</style>