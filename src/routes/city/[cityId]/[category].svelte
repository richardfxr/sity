<script context="module">
    import { getDbDoc, getDbDocFromRef } from "../../../firebase/firestore";

    export async function load({ params, fetch, session, stuff }) {
        // get city id
        let id = params.cityId;
        // get category
        let categoryId = params.category;
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

        // get category data
        let category = guideline.categories.find(cat => cat.id === categoryId);
        

        return {
            props: {
                loaded,
                id,
                category,
                city
            }
        };
    }
</script>

<script>
    // props
    export let loaded = false;
    export let id;
    export let category
    export let city;

    // imports
    import { onMount } from 'svelte';
    import { onPageLoad } from '$lib/page.js';
    import { curPage, defaultCity, defaultCityName } from '../../../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';

    /* === STORES ============================= */
    defaultCity.set(id);
    defaultCityName.set(city.name);

    // bindings
    let pageHeading;

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("city", $curPage, pageHeading);
	});
</script>


<div class="twoCol normalWidth" id="intro" aria-labelledby="pageHeading">
    <div class="hero">

        <div class="header">
            <a href="/">
                <SvgIcon icon="logotype"/>
            </a>
        </div>

        <h1 id="pageHeading" bind:this={pageHeading} tabindex="-1">{category.name}</h1>
    </div>

    <div class="content">
    </div>
</div>


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
</style>