<script>
    import A11yMenu from '$lib/a11yMenu.svelte';
    import SvgIcon from '$lib/svgIcon.svelte';
    import Button from '$lib/button.svelte';
    import SiteOptCard from '$lib/siteOptCard.svelte';

    // button options for A11yMenu
    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
    ];

    // options for SiteOptCards
    const siteOptions = [
        {id: "findYourCity", href: "#", bgColor:"#7BE6F5", title: "Find your city", text: "00 cities"},
        {id: "about", href: "#", bgColor:"#C4BFFF", title: "About us", text: "What is sity.earth?"},
        {id: "faq", href: "#", bgColor:"#F7B4D6", title: "FAQ", text: "00 questions"},
        {id: "settings", href: "#", bgColor:"#F7E57C", title: "Settings", text: "account and accessibility"},
    ]
</script>



<A11yMenu
    options={a11yMenuOptions}
    --textColorHover="var(--clr-0)"
    --menuBgColor="var(--clr-100)"
    --bgColor="var(--clr-150)"
    --bgColorHover="var(--clr-700)"
    --bgColorTransition="var(--clr-250)"/>

<main id="main">
    <div class="twoCol maxWidth">

        <div class="hero">

            <div class="header">
                <SvgIcon icon="logotype"/>
                <!-- tablet/mobile user auth buttons -->
                <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>

            </div>

            <h1>Recycling<br>— <span class="accent">demystified</span></h1>
            <p>A visual tour of the recycling journey - when to recycle, how to recycle, and where the recycling goes.</p>
        </div>

        <div class="content">
            <div class="header">
                <!-- desktop user auth buttons -->
                <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
            </div>
            <ul class="siteOpt">
                {#each siteOptions as siteOption}
                <li>
                    <SiteOptCard {...siteOption} />
                </li>
                {/each}
            </ul>
        </div>
    </div>
</main>


<style lang="scss">
    :global(html, body) {
        background-color: var(--clr-50);
    }

    .header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        height: var(--header-height);
    }

    .twoCol {
        display: grid;
        grid-template-columns: 1fr 45rem;
        align-items: start;
        gap: var(--pad-lg);
        padding: 0 var(--pad-hrz);

        .hero {
            /* force full height and centers text vertically */
            display: flex;
            flex-flow: column nowrap;
            /* sticky positioning so .hero does not move on scroll */
            position: sticky;
            top: 0;

            .header {
                :global(svg) {
                    width: 6rem;
                }

                :global(.button) {
                    margin-left: auto;
                    /* hide normal log in button on desktop due to layout */
                    display: none;
                }
            }

            h1 {
                // font-size: 110px;
                text-transform: uppercase;
                margin-bottom: 2rem;
                
                /* fluid font size
                 * min font size: 65px
                 * max font size: 105px
                 * min viewport width: 1451px
                 * max viewport width: 1800px
                 */
                --font-size: calc(65px + (105 - 65) * ((min(100vw, var(--max-width)) - 1451px) / (1800 - 1451)));
                font-size: var(--font-size);

                /* negative top margin so that top of h1 aligns with top of siteOptCards */
                margin-top: calc(-0.2 * var(--font-size));

                .accent {
                    color: var(--clr-700a);
                }
            }

            p {
                font-family: 'Lexend Deca', sans-serif;
                font-size: 1.3rem;
                font-weight: 400;
                color: var(--clr-900);
            }
        }

        .content {
            .header {
                justify-content: end;
                gap: var(--pad-xxs);
            }

            .siteOpt {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.1rem;

                li {
                    &:nth-child(even) {
                        position: relative;
                        top: var(--pad-xl);
                    }
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
        }
    }


    /* === BREAKPOINTS ======================== */
    @media only screen and (max-width: $breakpoint-smdesktop) {
        .twoCol {
            grid-template-columns: 1fr 40rem;
            align-items: start;
            gap: var(--pad-md);

            .hero {
                .header {
                    :global(svg) {
                        width: 4.5rem;
                    }
                }

                h1 {
                    /* fluid font size
                    * min font size: 47px
                    * max font size: 75px
                    * min viewport width: 1171px
                    * max viewport width: 1450px
                    */
                    --font-size: calc(47px + (75 - 47) * ((100vw - 1171px) / (1450 - 1171)));
                }
            }

            
        }
    }

    @media only screen and (max-width: 960px) {
        .siteOpt {
            width: min(100%, calc(2 * 13rem + 3 * var(--pad-sm)));
            grid-template-columns: repeat(2, 1fr);

            #about, #faq, #settings {
                /* reset individual card margins */
                margin-top: 0;
            }

            #about, #settings {
                /* offset second column */
                position: relative;
                top: 5rem;
            }
        }
    }
</style>
