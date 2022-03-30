<script>
    // imports
    import { curPage } from '../store/store.js';
    import SvgIcon from '$lib/svgIcon.svelte';

    // set curPage
    curPage.set("settings");
</script>


<div class="twoCol maxWidth" id="intro">
    <div class="hero">

        <div class="header">
            <a href="/">
                <SvgIcon icon="logotype"/>
            </a>
        </div>

        <h1>Settings</h1>
    </div>
</div>

<div class="placeholder"></div>

<style lang="scss">
    :global(html, body) {
        /* page variables */
        --pageClr-800: var(--clr-800);
        --pageClr-700: var(--clr-700);
        --pageClr-250: var(--clr-250);
        --pageClr-150: var(--clr-150);
        --pageClr-100: var(--clr-100);
        --pageClr-0: var(--clr-0);

        background-color: var(--clr-50);
    }

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