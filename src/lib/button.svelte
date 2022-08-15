<script>
    // props
    export let type = "button";
    export let style = "md";
    export let text = "add text";
    export let href = "#";
    export let icon = null;
    export let shareData = null;

    $: target = (href.charAt(0) === "#") ? "_self" : null;

    // imports
    import SvgIcon from '$lib/svgIcon.svelte';

    /**CSS varaible props
     * --inlineSize
     * --textClr - default text color
     * --textClrHover - text color on hover and focus-visible
     * --outlineColor
     * --bgClr - default background color
     * --bgClrHover - background color on hover
     * --bgClrTransition - background color that is transittioned to before being covered by --bgClrHover
    */

    /* === BINDINGS =========================== */
    let buttonText;

    /* === EVENT HANDLERS ===================== */
    /**
     * Shares shareData param using Web Share API with Clipboard API as fallback.
     * Clipboard API fallback only copies shareData.url to clipboard.
     * Only works on client.
     */
    async function shareURL() {
        if (navigator.share) {
            // Web Share API
            try {
                await navigator.share(shareData);
                buttonText.textContent = 'shared!';
            } catch(err) {
                console.error(err);
            }
        } else {
            // Clipboard API fallback
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    buttonText.textContent = 'copied!'
                })
                .catch(() => {
                    buttonText.textContent = 'error'
                });
        }
    }
</script>


{#if type==="button"}
    <button 
        on:click
        class="button {style}">
        {#if icon}
            <SvgIcon {icon} />
        {/if}
        { text }
    </button>
{:else if type==="link"}
    <a 
        class="button {style}"
        {href}
        {target}>
        {text}
    </a>
{:else if type==="share"}
    <button 
        on:click={shareURL}
        class="button {style}">
        <SvgIcon icon="share" />
        <span bind:this={buttonText}>{ text }</span>
    </button>
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
        color: var(--textClr, var(--clr-800));
        background-color: var(--bgClr, var(--clr-50));
        overflow: hidden;

        transition: transform var(--transition-300) var(--transition-smoothEase),
                    color var(--transition-200) ease-in-out,
                    background-color var(--transition-200) ease-in-out;

        &::before {
            /* ::before pseudo class that slides in as new bg when hovered/focused */
            inset-block: 0;
            inset-inline: 0;
            content: "";
            background-color: var(--bgClrHover, var(--clr-100));
            /* move ::before under main text */
            position: absolute;
            z-index: -1;

            /* -105% translateX to prevent ::before from peaking thorough */
            transform: translateY(50%) scale(0);
            transition: transform var(--transition-300) var(--transition-smoothEase);
        }

        &:hover, &:focus-visible {
            z-index: 101;
            color: var(--textClrHover, var(--clr-900));
            background-color: var(--bgClrTransition, var(--clr-100));

            &::before {
                transform: translateY(0%);  
            }
        }

        &:focus-visible {
            z-index: 100;
            outline: var(--focus-outline) var(--outlineColor, var(--clr-900));
            outline-offset: 0;
        }

        &.lg, &.lg--icon {
            display: flex;
            flex-flow: row nowrap;
            justify-content: start;
            gap: var(--pad-main);
            
            font-weight: 600;
            font-size: 1.3rem;

            height: 100%;
            width: 100%;
            border-radius: var(--border-radius);
            padding: 0 var(--pad-main);

            &::before {
                border-radius: var(--border-radius);
            }

            &:hover, &:focus-visible {
                transform: scale(1.05);
            }
        }

        &.md {
            /* variables */
            --height: 51px;

            font-size: calc(0.35 * var(--height));
            font-weight: 500;

            height: var(--height);
            border-radius: calc(var(--height) / 2);
            padding: 0 calc(0.47 * var(--height));

            &::before {
                border-radius: calc(var(--height) / 2);
            }

            &:hover, &:focus-visible {
                transform: scale(1.1);
            }
        }

        &.lg--icon {
            :global(svg) {
                --mainClr: var(--textClr, var(--clr-800));
                --strokeWidth: 4.8px;

                width: 25.6px;
            }

            &:hover, &:focus-visible {
                :global(svg) {
                    --mainClr: var(--textClrHover, var(--clr-900));
                }
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
                    background-color: var(--bgClrHover, var(--clr-100));

                    &::before {
                        transform: none;
                    }
                }

                &:focus-visible {
                    transform: none;
                    background-color: var(--bgClrHover, var(--clr-100));
                }
            }
        }
    }

    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-smdesktop) {
        .button {
            &.md {
                /* variables */
                --height: 42px;
            }
        }
    }

    @media only screen and (max-width: $breakpoint-mobile) {
        .button {
            &.lg, &.lg--icon {
                font-size: 1rem;
            }

            &.lg--icon {
                :global(svg) {
                    --strokeWidth: 4.8px;

                    width: 5vw;
                }
            }
        }
    }
</style>