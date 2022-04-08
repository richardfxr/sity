<script>
    // props
    export let id; // "guidelines" or "facility"
    export let href = "#";
    export let guidelineLength = "0";
    export let facilityName = "N/A";
    
    // imports
    import SvgShape from "$lib/svgShape.svelte";
    import SvgIcon from '$lib/svgIcon.svelte';
</script>


{#if id === "guidelines"}
    <a href="#categories" class="cityOptCard" id="guidelines">
        <!-- SVG shapes -->
        <SvgShape shape="plastic" bgClr="var(--clr-purple-150)" />
        <SvgShape shape="cardboard" bgClr="var(--clr-brown-150)" />
        <SvgShape shape="metal" bgClr="var(--clr-orange-150)" />
        <SvgShape shape="glass" bgClr="var(--clr-green-150)" />
        <SvgShape shape="paper" bgClr="var(--clr-vanilla-150)" />
        
        <h2>City guidelines</h2>
        <p class="text--xs">{guidelineLength} categories</p>
    </a>
{:else if id === "facility"}
    <a href={href} target="_blank" class="cityOptCard" id="facility">
        <SvgIcon icon="arrowTopRight" --mainClr="var(--clr-900)" />
        <p class="text--xs">Recycling processed by</p>
        <h2>{facilityName}</h2>
    </a>
{/if}


<style lang="scss">
    .cityOptCard {
        /* variables */
        --scaleHover: 1.03;
        --textTransY: -1rem;

        display: flex;
        flex-flow: column nowrap;
        gap: var(--pad-xxs);
        padding: var(--pad-main);
        background-color: var(--clr-100);

        /* round corners and prevent overflow */
        border-radius: var(--border-radius);
        overflow: hidden;

        /* relative position for .svgShape */
        position: relative;

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

            h2, p {
                transform: translateY(var(--textTransY));
            }
        }

        &:focus-visible {
            outline: var(--focus-outline) var(--clr-900);
            outline-offset: 0;
        }

        h2, p {
            transform: translateY(0);
            transition: transform var(--transition-300) var(--transition-smoothEase);
        }

        h2 {
            color: var(--clr-900);
            /* move h2 above ::before */
            position: relative;
            z-index: 1;
        }

        p {
            color: var(--clr-900);
            opacity: 0.85;
        }


        // id === "guidelines" card
        &#guidelines {
            height: 100%;
            /* push text to bottom of card */
            justify-content: flex-end;

            &:hover, &:focus-visible {
                :global(.plastic) {
                    transform: translate(20%, -10%) rotate(60deg);
                }

                :global(.cardboard) {
                    transform: translate(5%, -20%) rotate(7deg);
                }

                :global(.metal) {
                    transform: translate(-15%, -15%) rotate(97deg);
                }

                :global(.glass) {
                    transform: translate(-5%, -23%) rotate(40deg);
                }

                :global(.paper) {
                    transform: translate(2%, -25%) rotate(-6deg);
                }
            }

            // SvgShape positioning
            :global(.svgShape) {
                position: absolute;
                transition: transform var(--transition-300) var(--transition-smoothEase);
            }

            :global(.plastic) {
                width: 45%;
                transform: rotate(50deg);
                top: 13%;
                left: 67%;
            }

            :global(.cardboard) {
                width: 46%;
                top: -13%;
                left: 45%;
            }

            :global(.metal) {
                width: 40%;
                transform: rotate(110deg);
                top: 13%;
                left: -14%;
            }

            :global(.glass) {
                width: 45%;
                transform: rotate(50deg);
                top: -15%;
                left: 11%;
            }

            :global(.paper) {
                width: 49%;
                transform: rotate(-20deg);
                top: -4%;
                left: 18%;
            }
        }


        // id === "facility" card
        &#facility {
            margin-top: auto;

            &:hover, &:focus-visible {
                :global(svg) {
                    transform: translate(10%, -10%);
                }
            }

            :global(svg) {
                width: 2rem;
                margin-left: auto;
                padding-bottom: 2rem;
                /* move svgIcon above ::before */
                position: relative;
                z-index: 1;

                transform: translate(0);
                transition: transform var(--transition-300) var(--transition-smoothEase);
            }
        }
    }


    /* reduced motion */
    @media (prefers-reduced-motion) {
        :global([data-motion="auto"]) {
            .cityOptCard {
                /* variables - prevent scailing and translate */
                --scaleHover: 1;
                --textTransY: 0;

                &::before {
                    /* hide ::before element */
                    display: none;
                }

                &:hover, &:focus-visible {
                    background-color: var(--clr-150);
                }

                &#guidelines {
                    &:hover, &:focus-visible {
                        // remove all svgShape movements
                        :global(.plastic) {
                            transform: rotate(50deg);
                        }

                        :global(.cardboard) {
                            transform: rotate(0deg);
                        }

                        :global(.metal) {
                            transform: rotate(110deg);
                        }

                        :global(.glass) {
                            transform: rotate(50deg);
                        }

                        :global(.paper) {
                            transform: rotate(-20deg);
                        }
                    }
                }

                &#facility {
                    &:hover, &:focus-visible {
                        // remove svgIocn translate
                        :global(svg) {
                            transform: translate(0);
                        }
                    }
                }
            }
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-mobile) {
        .cityOptCard {
            /* variables */
            --textTransY: -3vw;

            &#facility {
                :global(svg) {
                    width: 6vw;
                    padding-bottom: 7vw;
                }
            }
        }
    }
</style>