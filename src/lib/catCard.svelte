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
    <Illustration illus={category.illus} clr1={category.illusClrs[0]} clr2={category.illusClrs[1]} clr3={category.illusClrs[2]} ariaHidden={true} dataDepth={0.4} />

    <span data-depth="0.7" class="text--h1" style={`--clr: var(--clr-${category.clr}-1000`}>{category.name}</span>
</a>


<style lang="scss">
    .catCard {
        display: block;
        position: relative;

        // background shape
        :global(.svgShape) {
            // default positioning, same as in-line styling applied by parallax-js
            position: relative;
        }

        // illustration
        :global(.illus) {
            // default positioning, same as in-line styling applied by parallax-js
            position: absolute;
        }

        span {
            display: block;
            color: var(--clr);
            // default positioning, same as in-line styling applied by parallax-js
            position: absolute;
        }

        // cartons category card
        &.cartons {
            // illustration
            :global(.illus) {
                width: 45%;
                margin-top: 23%;
                margin-left: 23%;
            }

            span {
                margin-top: 70%;
                margin-left: 20%;
            }
        }

        // cardboard category card
        &.cardboard {
            // background shape
            :global(.svgShape) {
                width: 92%;
                margin-top: 8%;
                margin-left: 4%;
            }

            // illustration
            :global(.illus) {
                width: 77%;
                margin-top: 30%;
                margin-left: 11%;
            }

            span {
                margin-top: 73%;
                margin-left: 8%;
            }
        }

        // paper category card
        &.paper {
            // background shape
            :global(.svgShape) {
                width: 96%;
                margin-left: 2%;
            }

            // illustration
            :global(.illus) {
                width: 68%;
                margin-top: 35%;
                margin-left: 20%;
            }

            span {
                margin-top: 70%;
                margin-left: 30%;
            }
        }

        // metal category card
        &.metal {
            // background shape
            :global(.svgShape) {
                width: 90%;
                margin-top: 5%;
                margin-left: 5%;
            }

            // illustration
            :global(.illus) {
                width: 38%;
                margin-top: 30%;
                margin-left: 30%;
            }

            span {
                margin-top: 70%;
                margin-left: 28%;
            }
        }

        // glass category card
        &.glass {
            // background shape
            :global(.svgShape) {
                width: 90%;
                margin-left: 5%;
            }

            // illustration
            :global(.illus) {
                width: 38%;
                margin-top: 30%;
                margin-left: 30%;
            }

            span {
                margin-top: 70%;
                margin-left: 35%;
            }
        }

        // plastic category card
        &.plastic {
            // illustration
            :global(.illus) {
                width: 38%;
                margin-top: 30%;
                margin-left: 30%;
            }

            span {
                margin-top: 70%;
                margin-left: 20%;
            }
        }
    }
    
</style>