<script context="module">
    // following code runs on both server and client

    import { initFirebase } from '../firebase/init';
    import { getDb } from '../firebase/firestore';

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
    import { onMount } from 'svelte';
    import A11yMenu from '$lib/a11yMenu.svelte';
    import NavBar from '$lib/navBar.svelte';
    import { fly } from 'svelte/transition';

    // props
    export let url = "";

    // button options for A11yMenu
    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#navBar"},
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
    <NavBar />

    <!-- page transition -->
    {#key url.pathname}
        <main id="main" in:fly="{{ y: flyAmount, duration: pageTransitionDuration, delay: pageTransitionDuration }}" out:fly="{{ y: flyAmountNeg, duration: pageTransitionDuration }}">
            <slot />
        </main>
    {/key}
</div>


<style lang="scss">
    :global(body) {
        /* default assignment of page colors to prevent flash of white on initial load */
        --pageClr-800: var(--clr-800);
        --pageClr-700: var(--clr-700);
        --pageClr-250: var(--clr-250);
        --pageClr-150: var(--clr-150);
        --pageClr-100: var(--clr-100);
        --pageClr-0: var(--clr-0);

        background-color: var(--clr-50);
    }

    .wrapper {
        // display: flex;
        // flex-flow: row nowrap;
        // gap: var(--pad-md);

        // /* limit max width and center everything */
        // width: 100%;
        // max-width: var(--max-width);
        // padding: 0 var(--pad-sm);
        // margin: 0 auto;

        #main {
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            gap: var(--pad-xl);
            align-items: center;
            margin-inline: auto;
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