<script>
    import Button from '$lib/button.svelte';

    // props
    export let options = [{text: "Skip to content.", href: "#content"}];

    /**CSS varaible props
     * --textColor - applies only to <Button />
     * --textColorHover - applies only to <Button />
     * --outlineColor - applies only to <Button />
     * --bgColor - applies to <Button />
     * --bgColorHover - applie only to <Button />
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
        gap: 0.3rem;
        /* absolute positioning to remove a11yMenu from the document flow */
        position: absolute;
        inset-block-start: var(--pad-lg);
        inset-inline: 0;

        inline-size: 20rem;
        padding-block: 1.1rem;
        padding-inline: 1.4rem;
        margin-inline: auto;
        background-color: var(--bgColor, var(--clr-100));
        border-radius: 2.4rem;

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
</style>