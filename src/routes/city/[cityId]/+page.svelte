<script>
    /* === PROP =============================== */
    export let data; // usused data: loaded

    /* === IMPORTS ============================ */
    import { onMount } from 'svelte';
    import { onPageLoad } from '$lib/page.js';
    import { curPage, defaultCity, defaultCityName } from '../../../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';
    import CityOptCard from '$lib/cityOptCard.svelte';
    import Button from '$lib/button.svelte';
    import CatCard from '$lib/catCard.svelte';

    /* === STORES ============================= */
    defaultCity.set(data.cityId);
    defaultCityName.set(data.city.name);

    // bindings
    let pageHeading;

    // categories array
    let cats = data.guideline.categories;

    // sharing data for Web Share API
    const shareData = {
        title: data.city.name + ", " + data.city.state + " - sity.earth",
        text: "Recycling in " + data.city.name + ", " + data.city.state,
        url: "https://sity.earth/city/" + data.cityId
    };
    console.log(shareData);

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("city", $curPage, pageHeading, "default");
	});
</script>


<svelte:head>
	<title>Recycling in {data.city.name}, {data.city.state}</title>
</svelte:head>


<div class="twoCol normalWidth" id="intro" aria-labelledby="pageHeading">
    <div class="hero">

        <div class="header">
            <a href="/">
                <SvgIcon icon="logotype"/>
            </a>
        </div>

        <h1 id="pageHeading" bind:this={pageHeading} tabindex="-1">Recycling in <br><span class="accent">{data.city.name}, {data.city.state}</span></h1>
    </div>

    <div class="content">
        <ul class="contentGrid cityOpt" aria-label="Options for {data.city.name}">
            <li class="guidelines">
                <CityOptCard id="guidelines" guidelineLength={data.guideline.categories.length} />
            </li>
            <li class="share">
                <Button type="share" style="lg--icon" text="Share" {shareData} --inlineSize="auto" --textClr="var(--clr-900)" --textClrHover="var(--clr-0)" --bgClr="var(--clr-100)" --bgClrHover="var(--clr-700)" --bgClrTransition="var(--clr-250)"/>
            </li>
            <li  class="facility">
                <CityOptCard id="facility" href={data.guideline.link} facilityName={data.guideline.name} />
            </li>
        </ul>
    </div>
</div>

<!-- recycling categories -->
<div class="cat" id="categories" role="region" aria-labelledby="catHeading">
    <h2 class="visuallyHidden" id="catHeading">Recycling categories</h2>
    <ul class="catGrid normalWidth">
        {#each cats as cat}
            <CatCard category={cat} cityId={data.cityId} />
        {/each}
    </ul>
</div>

<div class="placeHolder"></div>

<style lang="scss">
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
        }

        .facility {
            grid-area: facility;
            /* align facility to the bottom */
            display: flex;
            justify-content: flex-end;
        }
    }

    .cat {
        width: 100%;

        .catGrid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: var(--pad-cat);
            
            /* prevent horizontal overflow */
            overflow: hidden;

            /* center grid on larger vw */
            margin: 0 auto;
        }
    }

    


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-tablet) {
        .cat {
            .catGrid {
                grid-template-columns: 1fr 1fr;
            }
        }
    }
    @media only screen and (max-width: $breakpoint-mobile) {
        .cityOpt {
            grid-template: 
                "guidelines facility" 50vw
                "share facility" 13vw
                / 1fr 1fr;
        }

        .cat {
            .catGrid {
                grid-template-columns: 1fr;
                
                :global(.catCard) {
                    &:nth-child(2n - 1) {
                        margin-right: 20vw;
                        margin-left: -10vw;
                    }

                    &:nth-child(2n) {
                        margin-right: -10vw;
                        margin-left: 20vw;
                    }
                }
            }
        }
        
    }
</style>