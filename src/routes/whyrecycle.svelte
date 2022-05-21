<script>
    // imports
    import { onMount } from 'svelte';
    import { onPageLoad } from '$lib/page.js';
    import { curPage } from '../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';
    import Illustration from '$lib/illustration.svelte';

    // bindings
    let pageHeading;

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("recycle", $curPage, pageHeading, "default");
	});
</script>


<div class="twoCol normalWidth" id="intro" aria-labelledby="pageHeading">
    <div class="hero">

        <div class="header">
            <SvgIcon icon="logotype"/>
        </div>

        <h1 id="pageHeading" bind:this={pageHeading} tabindex="-1">Why Recycle?</h1>
        <p>Recycling magically disappears.<br> We throw it all in a bin, it gets carted away and never see it again.</p>
    </div>

    <div class="content contentFlex">
        <section class="card card--vrt">
            <Illustration illus="blackhole" clr1="neonBlue" clr2="greyCold" type="card--vrt"/>
            <p>Most people do not know where recycling goes. Even those in the waste industry do not know exactly where our waste ends up.</p>
        </section>
        <section class="card card--vrt">
            <Illustration illus="middleEast-questionMark" type="card--vrt"/>
            <p>In RI, for example, the main recycling facility, lists  “the Middle East” as a shipping destination. When we inquired further for specific locations, the answer was  “We don’t know because selling is handled by a third-party. Where it goes next changes everyday.”</p>
        </section>
        <section class="card card--vrt">
            <p>Where trash goes in the next process is not treated as our problem– it is always someone else’s. That’s why we decided to dive deep into this seemingly simple question; Where does our recycling really go?</p>
        </section>
        <section class="card card--vrt">
            <Illustration illus="blackhole" clr1="neonBlue" clr2="greyCold" type="card--vrt"/>
            <p>Most people do not know where recycling goes. Even those in the waste industry do not know exactly where our waste ends up. </p>
        </section>
    </div>
</div>


<style lang="scss">

    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-mobile) {
    }
</style>