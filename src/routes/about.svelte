<script>
    // imports
    import { onMount } from 'svelte';
    import { onPageLoad } from '$lib/page.js';
    import { curPage } from '../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';

    // bindings
    let pageHeading;

    // call onPageLoad on mount
    onMount(() => {
		onPageLoad("about", $curPage, pageHeading, "default");
	});
</script>


<div class="twoCol normalWidth" id="intro">
    <div class="hero">

        <div class="header">
            <a href="/">
                <SvgIcon icon="logotype"/>
            </a>
        </div>

        <h1 id="pageHeading" bind:this={pageHeading} tabindex="-1">About Us</h1>
    </div>
</div>

<div class="placeholder"></div>

<style lang="scss">
    .cityOpt {
        display: grid;
        grid-template: 
            "guidelines facility" 23rem
            "share facility" 5rem
            / 1fr 1fr;

        .guidelines {
            grid-area: guidelines;
        }

        .share {
            grid-area: share;

            :global(div:last-child) {
                :global(.button) {
                    /* hide mobile share button */
                    display: none; 
                }
            }
        }

        .facility {
            grid-area: facility;
            /* align facility to the bottom */
            display: flex;
            justify-content: flex-end;
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-mobile) {
        .cityOpt {
            grid-template: 
                "guidelines facility" 50vw
                "share facility" 13vw
                / 1fr 1fr;
            
            .share {
                :global(div:last-child) {
                    :global(.button) {
                        /* hide desktop share this page button */
                        display: flex; 
                    }
                }

                :global(div:first-child) {
                    :global(.button) {
                        /* show mobile share button */
                        display: none; 
                    }
                }
            }
        }
    }
</style>