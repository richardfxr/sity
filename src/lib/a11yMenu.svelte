<script>
    import Button from '$lib/button.svelte';

    // props
    export let options = [{text: "Skip to content.", href: "#main"}];

    /**CSS varaible props
     * --pageClr-800 - applied as --textClr to <Button />
     * --pageClr-700 - applied as --bgClrHover to <Button />
     * --pageClr-250 - applied as --bgClrTransition to <Button />
     * --pageClr-150 - applied as --bgClr to <Button />
     * --pageClr-100 - menu background color
     * --pageClr-0 - applied as --textClrHover to <Button />
     * --outlineColor - applies only to <Button />
    */
</script>


<ul class="a11yMenu">
    {#each options as option}
        <li><Button type="link" {...option} /></li>
    {/each}
</ul>

<style lang="scss">
    

    .a11yMenu {
        display: flex;
        flex-flow: column nowrap;
        gap: var(--pad-xxs);
        /* absolute positioning to remove a11yMenu from the document flow */
        position: absolute;
        z-index: 1000;
        inset-block-start: var(--pad-lg);
        inset-inline: 0;

        width: 20rem;
        padding: 1.1rem 1.5rem;
        margin-inline: auto;
        background-color: var(--pageClr-100, var(--clr-100));
        border-radius: 2.4rem;
        box-shadow: var(--boxShadow-main) var(--pageClr-100, var(--clr-100));

        pointer-events: none;
        transform: translateY(-3rem) scale(0.8);
        opacity: 0;
        transition: transform var(--transition-200) ease-in-out,
                    opacity var(--transition-200) ease-in-out;

        &:focus-within {
            pointer-events: auto;
            transform: translateY(0);
            opacity: 1;
        }

        :global(.button) {
            /* button varaibles */
            --textClr: var(--pageClr-800);
            --textClrHover: var(--pageClr-0);
            --bgClr: var(--pageClr-150);
            --bgClrHover: var(--pageClr-700);
            --bgClrTransition: var(--pageClr-250);
        }
    }

    /* reduced motion */
    @media (prefers-reduced-motion) {
        :global([data-motion="auto"]) {
            .a11yMenu {
                transform: none;
                /* change padding to look better as button no longer scale */
                padding: 1.1rem;
                
                &:focus-within {
                    transform: none;
                }
            }
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-smdesktop) {
        .a11yMenu {
            width: 16.25rem;
        }
    }
</style>