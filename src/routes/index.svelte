<script>
    import A11yMenu from '$lib/a11yMenu.svelte';

    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
    ];

    const siteOptions = [
        {id: "citySearch", href: "#", illu: "", bgColor:"#7BE6F5", title: "Find your city"},
        {id: "about", href: "#", illu: "", bgColor:"#C4BFFF", title: "About us"},
        {id: "faq", href: "#", illu: "", bgColor:"#F7B4D6", title: "FAQ"},
        {id: "settings", href: "#", illu: "", bgColor:"#F7E57C", title: "Settings"},
    ]
</script>



<A11yMenu
    options={a11yMenuOptions}
    --textColorHover="var(--clr-0)"
    --bgColor="var(--clr-100)"
    --bgColorHover="var(--clr-700)"/>

<main id="main">
    <h1 class="heroText">Demystifying recycling for sustainable cities.</h1>
    <ul class="siteOpt">
        {#each siteOptions as siteOption}
        <li>
            <a href={siteOption.href} id={siteOption.id}>
                <div class="siteOpt__illu" style="background-color: {siteOption.bgColor}">

                </div>
                <h2>{siteOption.title}</h2>
            </a>
        </li>
        {/each}
    </ul>
</main>


<style lang="scss">
    :global(html, body) {
        background-color: var(--clr-50);
    }

    .heroText {
        width: min(100%, 18ch);
        inline-size: min(100%, 18ch);
    }

    .siteOpt {
        display: grid;
        grid-template-columns: repeat(4, 13rem);
        gap: var(--pad-sm);

        padding-inline: var(--pad-sm);

        li {
            & > a {
                display: flex;
                flex-flow: column nowrap;
                gap: var(--pad-xxs);
            }
        }

        #about {
            margin-top: 5rem;
        }

        #faq {
            margin-top: 1rem;
        }

        #settings {
            margin-top: 3rem;
        }

        &__illu {
            width: 100%;
            aspect-ratio: 31 / 50;
            border-radius: 1.5rem;
        }

        h2 {
            font-family: 'Lexend Deca', sans-serif;
            font-size: 1.3rem;
            font-weight: 600;
            line-height: 1.7em;
            text-align: center;
            color: var(--clr-800);
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: 960px) {
        .siteOpt {
            width: min(100%, calc(2 * 13rem + 3 * var(--pad-sm)));
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
