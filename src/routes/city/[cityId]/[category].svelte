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
    import CatStep from '$lib/catStep.svelte';

    /* === STORES ============================= */
    defaultCity.set(id);
    defaultCityName.set(city.name);

    console.log(category.details[0]);

    // bindings
    let pageHeading;

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("city", $curPage, pageHeading, category.clr);
	});
</script>


<div class="twoCol normalWidth" id="intro" aria-labelledby="pageHeading">
    <div class="hero">

        <div class="header">
            <a href="/">
                <SvgIcon icon="logotype"/>
            </a>
        </div>

        <h1 id="pageHeading" bind:this={pageHeading} tabindex="-1">How to recycle {category.name}</h1>
    </div>

    <div class="content">
        
    </div>
</div>

<div class="normalWidth">
    {#each category.details as detail}
        <div class="detailSection">
            {#if detail.component === "CatStep"}
                {#each detail.array as step}
                    <CatStep {step} />
                {/each}
            {/if}
        </div>
    {/each}
</div>

<div></div>


<style lang="scss">
    .detailSection {
        /* grid */
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--pad-xs);
    }

    /* ========================================
    BREAKPOINTS
    ======================================== */

    @media only screen and (max-width: $breakpoint-smdesktop) {
        .detailSection {
            grid-template-columns: 1fr;
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        .detailSection {
            gap: var(--pad-sm);
        }
    }
</style>