<script>
    // props
    export let id = "#";
    export let name = "N/A";
    export let state = "N/A";

    // imports
    import SvgShape from "$lib/svgShape.svelte";
</script>

<a class="cityCard" href="/city/{id}">
    <!-- SVG shapes -->
    <!-- <SvgShape shape="Plastic" --bgColor="var(--clr-plastic-150)" />
    <SvgShape shape="Cardboard" --bgColor="var(--clr-cardboard-150)" />
    <SvgShape shape="Metal" --bgColor="var(--clr-metal-150)" />
    <SvgShape shape="Paper" --bgColor="var(--clr-paper-150)" /> -->

    <span class="city text--h2">{name}</span>
    <span class="state text--xs">{state}</span>
</a>

<style lang="scss">
    .cityCard {
        /* variables */
        --scaleHover: 1.03;
        --svgScale: 0;
        --svgTransY80: 80%;
        --svgTransY70: 70%;
        --svgTransY50: 50%;

        display: block;
        padding: var(--pad-main);
        background-color: var(--clr-100);
        border-radius: var(--border-radius);

        /* realtive position for ::before element */
        position: relative;
        /* prevent ::before element from overflowing */
        overflow: hidden;

        transform: scale(1);
        transition: transform var(--transition-300) var(--transition-smoothEase),
                    background-color var(--transition-200) ease-in-out;

        &::before {
            /* ::before pseudo class that appears as a circle when hovered/focused */
            content: "";
            border-radius: var(--border-radius);
            background-color: var(--clr-150);
            /* move ::before under main text */
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 0;

            transform: translateY(50%) scale(0);
            transition: transform var(--transition-300) var(--transition-smoothEase),
                        background-color var(--transition-200) ease-in-out;
        }

        &:hover, &:focus-visible {
            transform: scale(var(--scaleHover));

            &::before {
                transform: translateY(0%) scale(1);  
            }

            :global(.plastic) {
                width: 25%;
                transform: translateY(0) scale(1) rotate(20deg);
                top: 30%;
                left: 80%;
            }

            :global(.cardboard) {
                width: 23%;
                transform: translateY(0) scale(1) rotate(-40deg);
                top: 20%;
                left: 64%;
            }

            :global(.metal) {
                width: 22%;
                transform: translateY(0) scale(1) rotate(110deg);
                top: 50%;
                left: 50%;
            }

            :global(.paper) {
                width: 24%;
                transform: translateY(0) scale(1) rotate(-35deg);
                top: 50%;
                left: 68%;
            }
        }

        &:focus-visible {
            outline: var(--focus-outline) var(--clr-900);
            outline-offset: 0;
        }

        :global(.svgShape) {
            position: absolute;
            z-index: 0;
            transition: transform var(--transition-300) var(--transition-smoothEase),
                        opacity var(--transition-200) ease-in-out;
        }

        :global(.plastic) {
            width: 25%;
            transform: translateY(var(--svgTransY70)) scale(var(--svgScale)) rotate(20deg);
            top: 30%;
            left: 80%;
        }

        :global(.cardboard) {
            width: 23%;
            transform: translateY(var(--svgTransY80)) scale(var(--svgScale)) rotate(-40deg);
            top: 20%;
            left: 64%;
        }

        :global(.metal) {
            width: 22%;
            transform: translateY(var(--svgTransY50)) scale(var(--svgScale)) rotate(110deg);
            top: 50%;
            left: 50%;
        }

        :global(.paper) {
            width: 24%;
            transform: translateY(var(--svgTransY50)) scale(var(--svgScale)) rotate(-35deg);
            top: 50%;
            left: 68%;
        }

        .city {
            display: block;
            position: relative;
            z-index: 0;
        }

        .state {
            opacity: 0.85;
        }
    }


    /* reduced motion */
    @media (prefers-reduced-motion) {
        :global([data-motion="auto"]) {
            .cityCard {
                /* variables - prevent scailing and translate */
                --scaleHover: 1;
                --svgScale: 1;
                --svgTransY80: 0;
                --svgTransY70: 0;
                --svgTransY50: 0;

                &::before {
                    /* hide ::before element */
                    display: none;
                }

                &:hover, &:focus-visible {
                    background-color: var(--clr-150);

                    :global(.svgShape) {
                        /* fade opacity in */
                        opacity: 1;
                    }
                }

                :global(.svgShape) {
                    /* set all .svgShape opacity to 0 */
                    opacity: 0;
                }
            }
        }
    }
</style>