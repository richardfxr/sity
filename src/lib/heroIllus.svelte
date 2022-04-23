<script>
    /* === IMPORTS ============================ */
    import SvgIcon from '$lib/svgIcon.svelte';
    import Illustration from '$lib/illustration.svelte';

    /* === BINDINGS =========================== */
    let scrollY;
    let windowWidth
    let windowHeight;

    /* === REACTIVE DECLARATIONS ============== */
    let scrollLimit = 0.8;
    $: isMobile = windowWidth <= 650 ? true  : false;
    $: scrollYRatio = scrollY / windowHeight;
    // scroll variable used for .heroIllus
    $: scrollYInv = scrollYRatio / scrollLimit < 1 ? 1 - (scrollYRatio / scrollLimit)  : 0;
    // same as scrollYInv except on mobile, where it becomes 0
    $: scrollYInvMobile = isMobile ? 0  : scrollYInv;
</script>


<svelte:window bind:scrollY={scrollY} bind:innerHeight={windowHeight} bind:innerWidth={windowWidth}/>


<div id="heroIllus">
    <div class="container">
        <div class="normalWidth">
            <!-- transforms: translateX and translateY centers main when on top of page -->
            <div class="main" style="transform: scale({1 + scrollYInv}) translateX(calc((-1 * {scrollYInvMobile} * ((var(--nav-size) + var(--pad-md)) / 2)) / {1 + scrollYInvMobile})) translateY(calc(-6.5 * {scrollYInv}vh))">

                <!-- logotype -->
                <SvgIcon icon="logotype-border"/>

                <!-- vortex layers -->
                <div class="vortex vortex-2">
                    <!-- layer 2 -->
                    <Illustration illus="pizzaBox-dirty" clr1="brown" clr2="offWhite" ariaHidden={true} />
                    <Illustration illus="metalCan-default" clr1="salmon" clr2="silverWarm" ariaHidden={true} />
                    <Illustration illus="cardboardBox-closed" clr1="brown" clr2="offWhite" clr3="red" ariaHidden={true} />
                </div>
                <div class="vortex vortex-1">
                    <!-- layer 1 -->
                    <Illustration illus="plasticBottle-default" clr1="brown" clr2="offWhite" ariaHidden={true} />
                    <Illustration illus="glassCup-empty" clr1="skyBlueTransparent" ariaHidden={true} />
                    <Illustration illus="carton-default" clr1="skyBlue" clr2="offWhite" ariaHidden={true} />
                </div>

                <!-- shadow that appears under .textCard on scroll -->
                <div class="shadow__container">
                    <div class="shadow" style="transform: translateY(calc(var(--mainHeight) * 0.95 - var(--border-radius) + ((var(--mainHeight) * {scrollYInv}) / 20)))"></div>
                </div>
                
                <!-- text card lid that slides down on scroll -->
                <div class="textCard" style="transform: translateY(calc({scrollYInv}* (-1 * var(--mainHeight))))">
                    <span class="text--h1">Where does it all go?</span>
                    <div class="handles">
                        <!-- left bin handle -->
                        <Illustration illus="binHandle-left" clr1="main" ariaHidden={true} />
                        <!-- right bin handle -->
                        <Illustration illus="binHandle-right" clr1="main" ariaHidden={true} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    #heroIllus {
        height: 150vh;
        width: 100%;

        /* center .container within */
        display: flex;
        justify-content: center;

        /* padding so .main does not hit very bottom and get cut off by contain: paint */
        padding-bottom: var(--pad-md);

        /* remove gap between #heroIllus and #intro */
        margin-bottom: calc(-1 * var(--pad-xxl));

        .container {
            /* sticky positioning */
            position: sticky;
            top: 0;
            right: 0;
            left: 0;

            display: flex;
            align-items: flex-end;
            justify-content: center;

            width: 100vw;
            // width: 100%;
            height: 100vh;

            /* prevent overflow from scaling */
            overflow: hidden;

            .main {
                /* variables */
                /* --scrollYInv assigned in-line by Svelte */
                --mainHeight: 75vh;
                --borderWidth: 0;
                --vortexScale: 1;
                
                /* sizing */
                // width: 100%;
                height: var(--mainHeight);
                
                /* border */
                border: solid var(--clr-stroke) var(--borderWidth);
                border-radius: var(--border-radius);

                background-color: var(--pageClr-250);

                will-change: transform;

                :global(.logotype) {
                    width: 20%;

                    /* center logotye */
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    z-index: 500;

                    /* scale along with vortex */
                    transform: scale(var(--vortexScale));
                }

                .vortex {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    :global(.illus) {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                    }

                    &-2 {
                        z-index: 499;
                        animation: rotateForever 23s linear infinite;

                        :global(svg:nth-child(1)) {
                            width: 25%;
                            padding: 18% 0 0 4%;
                            transform: rotate(250deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(2)) {
                            width: 5%;
                            padding: 18% 0 0 0;
                            transform: rotate(84deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(3)) {
                            width: 28%;
                            padding: 27% 0 0 10%;
                            transform: rotate(11deg) scale(var(--vortexScale));
                        }
                    }

                    &-1 {
                        z-index: 499;
                        animation: rotateForever 30s linear infinite;

                        :global(svg:nth-child(1)) {
                            width: 20%;
                            padding: 0 20% 30% 0;
                            transform: rotate(28deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(2)) {
                            width: 17%;
                            padding: 32% 0 0 10%;
                            transform: rotate(69deg) scale(var(--vortexScale));
                        }

                        :global(svg:nth-child(3)) {
                            width: 20%;
                            padding: 30% 0 0 10%;
                            transform: rotate(320deg) scale(var(--vortexScale));
                        }
                    }
                }

                .shadow {
                    /* z-index to cover vortex illustrations */
                    position: relative;
                    z-index: 501;
                    width: 100%;
                    height: 100%;
                    background-color: var(--clr-600);

                    &__container {
                        width: 100%;
                        height: 100%;

                        border-radius: var(--border-radius);
                        overflow: hidden;
                    }
                }

                .textCard {
                    /* take up all of .main with space at bottom */
                    width: calc(100% + 2 * var(--borderWidth));
                    height: 95%;
                    /* overlap borders */
                    margin: 0 calc(-1 * var(--borderWidth));

                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 502;

                    /* flexbox to center span */
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: center;

                    border: solid var(--clr-stroke) var(--borderWidth);
                    border-radius: var(--border-radius);
                    overflow: hidden;

                    background-color: var(--pageClr-100);

                    will-change: transform;

                    span {
                        padding: 0 var(--pad-lg);
                        text-align: center;
                        font-size: min(5.5vw, calc(var(--max-width) * 0.055));
                    }

                    .handles {
                        /* position handles to bottom of .textCard */
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        left: 0;

                        /* flexbox to push handle to sides */
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        height: 14rem;
                        padding: 0 2rem 2rem 2rem;

                        :global(.illus) {
                            height: 100%;
                        }
                    }
                }
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-smdesktop) {
        #heroIllus {
            .container {
                .main {
                    .textCard {
                        .handles {
                            height: 12rem;
                            padding: 0 1.5rem 1.5rem 1.5rem;
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-width: $breakpoint-tablet) {
        #heroIllus {
            .container {
                .main {
                    /* variables */
                    --vortexScale: 1.5; // scale vortex

                    .textCard {
                        span {
                            font-size: min(8vw, calc(var(--max-width) * 0.08));
                        }

                        .handles {
                            height: 8rem;
                            padding: 0 1rem 1rem 1rem;
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        #heroIllus {
            .container {
                .main {
                    /* variables */
                    --vortexScale: 2; // scale vortex

                    .textCard {
                        span {
                            padding: 0 var(--pad-md);
                            font-size: min(12vw, calc(var(--max-width) * 0.12));
                        }

                        .handles {
                            height: 8rem;
                            padding: 0 0.75rem 0.75rem 0.75rem;
                        }
                    }
                }
            }
        }
    }
</style>