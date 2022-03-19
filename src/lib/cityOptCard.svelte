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
    <a href="#guidelines" class="cityOptCard" id="guidelines">
        <!-- SVG shapes -->
        <SvgShape shape="Plastic" --bgColor="var(--clr-plastic-150)" />
        <SvgShape shape="Cardboard" --bgColor="var(--clr-cardboard-150)" />
        <SvgShape shape="Metal" --bgColor="var(--clr-metal-150)" />
        <SvgShape shape="Glass" --bgColor="var(--clr-glass-150)" />
        <SvgShape shape="Paper" --bgColor="var(--clr-paper-150)" />
        
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

        h2 {
            color: var(--clr-900);
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

            // SvgShape positioning
            :global(.svgShape) {
                position: absolute;
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

            :global(svg) {
                width: 2rem;
                margin-left: auto;
                padding-bottom: 2rem;
            }
        }
    }
</style>