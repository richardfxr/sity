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
     * --bgColorTransition
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

            /* -105% translateX to prevent ::before from peaking thorough */
            transform: translateY(50%) scale(0);
            transition: transform var(--transition-200) ease-out;
        }

        &:hover, &:focus-visible {
            z-index: 101;
            color: var(--textColorHover, var(--clr-900));
            background-color: var(--bgColorTransition, var(--clr-100));
            transform: scale(1.1);

            &::before {
                transform: translateY(0%);  
            }
        }

        &:focus-visible {
            z-index: 100;
            outline: var(--focus-outline) var(--outlineColor, var(--clr-900));
            outline-offset: 0;
        }

        &.md {
            /* variables */
            --height: 3.2rem;

            font-size: calc(0.35 * var(--height));
            font-weight: 500;

            height: var(--height);
            border-radius: calc(var(--height) / 2);
            padding: 0 calc(0.47 * var(--height));

            &::before {
                border-radius: calc(var(--height) / 2);
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

    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-smdesktop) {
        .button {
            &.md {
                /* variables */
                --height: 2.6rem;
            }
        }
    }
</style>