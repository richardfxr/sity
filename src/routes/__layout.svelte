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
    import { fade, fly } from 'svelte/transition';

    // props
    export let url = "";

    // page transition parameter
    let pageTransitionDuration = 300;   
    let flyAmount = 300;
    $: flyAmountNeg = -1 * flyAmount;
</script>

<!-- page transition -->
{#key url.pathname}
    <div in:fly="{{ y: flyAmount, duration: pageTransitionDuration, delay: pageTransitionDuration }}" out:fly="{{ y: flyAmountNeg, duration: pageTransitionDuration }}">
        <slot />
    </div>
{/key}
