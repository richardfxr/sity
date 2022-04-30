<script>
    // props
    export let step;

    // imports
    import Illustration from '$lib/illustration.svelte';
</script>


<section class="catStep" style="--bgClr: var(--clr-{step.clr}-200)">
    <div class="text">
       <h3>{step.title}</h3> 
       <p>{step.text}</p>
    </div>
    <Illustration {...step.illus} type="step"/>
</section>


<style lang="scss">
    .catStep {
        /* grid */
        display: grid;
        grid-template-columns: 1fr 1fr;

        border-radius: var(--border-radius);
        background-color: var(--bgClr);

        .text {
            display: flex;
            flex-flow: column nowrap;

            padding: var(--pad-md);

            h3 {
                font-size: 2.3rem;
            }

            p {
                font-size: 1.7rem;
                font-weight: 500;
                margin-top: auto;
            }
        }
    }

    /* ========================================
    BREAKPOINTS
    ======================================== */

    @media only screen and (max-width: $breakpoint-smdesktop) {
    }

    @media only screen and (max-width: $breakpoint-tablet) {
        .catStep {
            .text {
                h3 {
                    font-size: 2rem;
                }

                p {
                    font-size: 1.2rem;
                }
            }
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        .catStep {
            grid-template-columns: 1fr;
        }
    }
</style>