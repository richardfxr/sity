<script>
    // props
    export let category; // category object from Firebase Firestore
    export let cityId; // city.id used for routing

    // imports
    import Parallax from 'parallax-js'
    import { onMount } from 'svelte';
    import { browser } from '$app/env';
    import SvgShape from "$lib/svgShape.svelte";
    import Illustration from '$lib/illustration.svelte';

    // declare variables
    let parallaxScene;
    let parallaxInstance;
    const url = "/city/" + cityId + "/" + category.id;
    let depthOffset = parseFloat(category.depthOffset);

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
    <SvgShape shape={category.id} ariaHidden={true} dataDepth={depthOffset + 0.2} bgClr={`var(--clr-${category.clr}-150)`} />

    <!-- SVG illustration -->
    <Illustration illus={category.illus} clr1={category.illusClrs[0]} clr2={category.illusClrs[1]} clr3={category.illusClrs[2]} ariaHidden={true} dataDepth={depthOffset + 0.4} />

    <span data-depth="0.7" class="text--h1" style={`--clr: var(--clr-${category.clr}-900`}>{category.name}</span>
</a>


<style lang="scss">
    .catCard {
        display: block;
        position: relative;
        /* override pointer-evetns:none */
        pointer-events: auto !important;

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
            // override default font size
            font-size: min(4vw, calc(var(--max-width) * 0.04));

            // center span
            position: absolute;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
        }

        // cartons category card
        &.cartons {
            // illustration
            :global(.illus) {
                width: 45%;
                margin-top: 23%;
                margin-left: 28%;
            }

            span {
                margin-top: 70%;
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
                margin-top: 53%;
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
                margin-top: 38%;
                margin-left: 20%;
            }

            span {
                margin-top: 43%;
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
                width: 32%;
                margin-top: 35%;
                margin-left: 34%;
            }

            span {
                margin-top: 60%;
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
                width: 40%;
                margin-top: 28%;
                margin-left: 30%;
            }

            span {
                margin-top: 53%;
            }
        }

        // plastic category card
        &.plastic {
            // illustration
            :global(.illus) {
                width: 32%;
                margin-top: 17%;
                margin-left: 35%;
            }

            span {
                margin-top: 60%;
            }
        }
    }
    
    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-tablet) {
        .catCard {
            span {
                font-size: min(6.1vw, calc(var(--max-width) * 0.061));
            }
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        .catCard {
            span {
                font-size: min(13vw, calc(var(--max-width) * 0.13));
            }

            // metal category card
            &.metal {
                // background shape
                :global(.svgShape) {
                    margin-top: -5%;
                    margin-bottom: 4%;
                }

                // illustration
                :global(.illus) {
                    width: 32%;
                    margin-top: 25%;
                    margin-left: 34%;
                }

                span {
                    margin-top: 50%;
                }
            }

            // glass category card
            &.glass {
                // background shape
                :global(.svgShape) {
                    margin-top: 4%;
                    margin-bottom: 4%;
                }
            }

            // plastic category card
            &.plastic {
                // background shape
                :global(.svgShape) {
                    margin-top: 4%;
                    margin-bottom: 4%;
                }

                // illustration
                :global(.illus) {
                    width: 32%;
                    margin-top: 17%;
                    margin-left: 35%;
                }
            }
        }
    }
</style>