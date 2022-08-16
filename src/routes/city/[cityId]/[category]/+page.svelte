<script>
    /* === PROP =============================== */
    export let data; // usused data: loaded

    /* === IMPORTS ============================ */
    import { onMount } from 'svelte';
    import { onPageLoad } from '$lib/page.js';
    import { curPage, defaultCity, defaultCityName } from '../../../../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';
    import CatStep from '$lib/catStep.svelte';

    /* === STORES ============================= */
    defaultCity.set(data.id);
    defaultCityName.set(data.city.name);

    console.log(data.category.details[0]);

    // bindings
    let pageHeading;

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("city", $curPage, pageHeading, data.category.clr);
	});
</script>


<svelte:head>
	<title>Recycling {data.category.name} in {data.city.name}, {data.city.state}</title>
</svelte:head>


<div class="twoCol normalWidth" id="intro" aria-labelledby="pageHeading">
    <div class="hero">

        <div class="header">
            <a href="/">
                <SvgIcon icon="logotype"/>
            </a>
        </div>

        <h1 id="pageHeading" bind:this={pageHeading} tabindex="-1">How to recycle {data.category.name}</h1>
    </div>

    <div class="content">
        
    </div>
</div>

<div class="normalWidth">
    {#each data.category.details as detail}
        <div class="detailGrid">
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
    
</style>