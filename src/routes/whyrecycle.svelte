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


<svelte:head>
	<title>Why recycle? - Sity</title>
</svelte:head>


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
            <p>Luckily, we have a friend that knows this process better than anyone else; Meet Dave. Dave held your iced latte yesterday. You left him in the recycling, but before he is turned into new plastic, there are many obstacles to come.</p>
            <Illustration illus="dave-inBin" clr1="whiteTransparent" clr2="blue" clr3="hotPink" type="card--vrt"/>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Dave in a truck</div>
            <p>First, Dave gets in the recycling truck, which takes him to the Material Recycling Facility.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Dave being fed into a drum feeder</div>
            <p>The Material Recycling Facilitiy uses a wide variety of technology to sort through mountains of trash.<br><br>
               First, a pay loader scoops up Dave and feeds him through the drum feeder. This equipment loosens up the recycling to the right</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Dave going through a conveyor belt</div>
            <p>Then, Dave moves onto a conveyor belt. Workers line up on both sides to take out recyclables that have been incorrectly placed.<br><br>
               Dave passes through 4 different star screens. These star screens, based on gear size and distance, sort based on density. Light materials like newsprint remain on top, while heavier materials like Dave go to the bottom.<br><br>
               Dave says goodbye to his metal friends as they are attracted by a magnetic conveyor belt.<br><br>
               There are also optic sensors, which double checks the sorting.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Worker sorting through recycling</div>
            <p>Despite all these high tech machines,  recycling involves a lot of manual labor. Workers handsort recyclables after all the automated steps mentioned above.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Dave being shipped off</div>
            <p>After passing through one last round of manual sorting, Dave and his other plastic friends are compacted into big blocks and shipped off to a buyer.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Another worker sorting through recycling</div>
            <p>Depending on the recycling quality, the plastic mill Dave arrives at may choose to do another sorting manually.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Dave getting shredded :(</div>
            <p>Next, Dave is shredded with a machine that simultaneously runs water through; this allows plastics to be washed while being broken down. The process is called wet shredding.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Water evaporating from plastic pile</div>
            <p>After, there is the drying stage, where machines either use mechanical or thermal energy to separate the water from plastics.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Pellets being molded back into Dave</div>
            <p>Lastly, Dave is molded into pellets, which can be remolded into new products.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Single stream recycling</div>
            <p>What Dave just went through is called single stream recycling.  Single stream recycling is expensive, using a complex network of machinery and a large workforce to just sort our trash.</p>
        </section>
        <section class="card card--vrt">
            <div class="illus--placeholder">Dave</div>
            <p>So maybe, next time, when you see a Dave think twice about having him hold your coffee.</p>
        </section>
    </div>
</div>

<div></div>


<style lang="scss">

    .illus--placeholder {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 15rem;
        margin: var(--pad-md) var(--pad-sm) 0 var(--pad-sm);
        background-color: var(--pageClr-250);
        border-radius: var(--border-raidus-sm);
        overflow: hidden;
    }

    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-mobile) {
    }
</style>