<script>
    // props
    export let type = "button";
    export let style = "md";
    export let text = "add text";
    export let href = "#";
    export let target = "_self";

    /**CSS varaible props
     * --inlineSize
     * --textColor
     * --textColorHover
     * --outlineColor
     * --bgColor
     * --bgColorHover
    */
</script>


{#if type==="button"}
    <button 
        on:click
        class="button {style}">
        { text }
    </button>
{:else if type==="link"}
    <a 
        class="button {style}"
        {href}
        {target}>
        {text}
    </a>
{/if}


<style lang="scss">
    .button {
        /* felxbox to center text */
        display: flex;
        justify-content: center;
        align-items: center;
        /* position to allow ::before to be under text */
        position: relative;
        z-index: 1;

        inline-size: var(--inlineSize, 100%);
        font-family: 'Lexend Deca', sans-serif;
        line-height: 1.7em;
        color: var(--textColor, var(--clr-800));
        background-color: var(--bgColor, var(--clr-50));
        overflow: hidden;

        transition: transform var(--transition-200) var(--transition-fn1),
                    color var(--transition-200) ease-in-out,
                    background-color var(--transition-200) ease-in-out;

        &::before {
            /* ::before pseudo class that slides in as new bg when hovered/focused */
            inset-block: 0;
            inset-inline: 0;
            content: "";
            background-color: var(--bgColorHover, var(--clr-100));
            /* move ::before under main text */
            position: absolute;
            z-index: -1;

            transform: translateX(-100%);
            transition: transform var(--transition-200) ease-out;
        }

        &:hover {
            z-index: 101;
            transform: scale(1.05);
            color: var(--textColorHover, var(--clr-900));

            &::before {
                transform: translateX(0%);
            }
        }

        &:focus-visible {
            z-index: 100;
            transform: scale(1.05);
            color: var(--textColorHover, var(--clr-900));
            outline: var(--focus-outline) var(--outlineColor, var(--clr-900));
            outline-offset: 0;

            &::before {
                transform: translateX(0%);
            }
        }

        &.md {
            /* variables */
            --blockHeight: 3.2rem;

            font-size: 1.1rem;
            font-weight: 500;

            block-size: var(--blockHeight);
            border-radius: calc(var(--blockHeight) / 2);

            &::before {
                border-radius: calc(var(--blockHeight) / 2);
            }
        }
    }

    /* reduced motion */
    @media (prefers-reduced-motion) {
        :global([data-motion="auto"]) {
            .button {
                &::before {
                    display: none;
                }

                &:hover {
                    transform: none;
                    background-color: var(--bgColorHover, var(--clr-100));

                    &::before {
                        transform: none;
                    }
                }

                &:focus-visible {
                    transform: none;
                    background-color: var(--bgColorHover, var(--clr-100));
                }
            }
        }
    }
</style>