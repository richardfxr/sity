<script>
    import Button from '$lib/button.svelte';

    // props
    export let options = [{text: "Skip to content.", href: "#main"}];

    /**CSS varaible props
     * --menuBgColor
     * --textColor - applies only to <Button />
     * --textColorHover - applies only to <Button />
     * --outlineColor - applies only to <Button />
     * --bgColor - applies to <Button />
     * --bgColorHover - applies only to <Button />
     * --bgColorTransition - applies only to <Button />
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
        gap: 0.7rem;
        /* absolute positioning to remove a11yMenu from the document flow */
        position: absolute;
        z-index: 1000;
        inset-block-start: var(--pad-lg);
        inset-inline: 0;

        inline-size: 20rem;
        padding: 1.1rem;
        margin-inline: auto;
        background-color: var(--menuBgColor, var(--clr-100));
        border-radius: 2.4rem;
        box-shadow: var(--boxShadow-main) var(--bgColor, var(--clr-100));

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
    }

    /* reduced motion */
    @media (prefers-reduced-motion) {
        :global([data-motion="auto"]) {
            .a11yMenu {
                transform: none;
                
                &:focus-within {
                    transform: none;
                }
            }
        }
    }
</style>