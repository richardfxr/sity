<script>
    // props
    export let category; // category object from Firebase Firestore

    // imports
    import Parallax from 'parallax-js'
    import { onMount } from 'svelte';
    import { browser } from '$app/env';
    import SvgShape from "$lib/svgShape.svelte";
    import Illustration from '$lib/illustration.svelte';

    // declare variables
    let parallaxScene;
    let parallaxInstance;
    const url = "/" + category.id;

    onMount(() => {
        // prevent code from running on server
		if (!browser) return;

        parallaxInstance = new Parallax(parallaxScene);
	});
</script>


<a href={url}
   class="catCard {category.id}"
   bind:this={parallaxScene}
   data-hover-only="true">
    <!-- SVG shape background -->
    <SvgShape shape={category.id} ariaHidden={true} dataDepth={0.1 + category.depthOffset} bgClr={`var(--clr-${category.clr}-100)`} />

    <!-- SVG illustration -->
    <Illustration illus={category.illus} clr={category.clr} ariaHidden={true} dataDepth={0.4} />

    <span data-depth="0.7" class="text--h1" style={`--clr: var(--clr-${category.clr}-1100`}>{category.name}</span>
</a>


<style lang="scss">
    .catCard {
        display: block;

        span {
            display: block;
            color: var(--clr);
        }

        &.Carton {

        }
    }
    
</style>