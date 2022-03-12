<script context="module">
    import { getDbDoc } from "../../firebase/firestore";

    export async function load({ params, fetch, session, stuff }) {
        // get city id
        let id = params.id;
        // get Firestore database
        const db = stuff.db
        // declare variables
        let loaded;
        let city;
        let guideline;

        // retrieve data from Firestore
        try {
            // get city document data
            city = await getDbDoc(db, "cities", id);
            // get city guideline
            guideline = await getDbDoc(db, "guidelines", city.guideline);

            // set loaded to true
            loaded = true;
        } catch(error) {
            // set loaded to false
            loaded = false;
            // log error
            console.error(error.message);
        }
        

        return {
            props: {
                loaded,
                id,
                city,
                guideline
            }
        };
    }
</script>

<script>
    // props
    export let loaded = false;
    export let id;
    export let city;
    export let guideline;

    // imports
    import A11yMenu from '$lib/a11yMenu.svelte';
    import SvgIcon from '$lib/svgIcon.svelte';
    import Button from '$lib/button.svelte';

    // button options for A11yMenu
    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
    ];
</script>



<A11yMenu
    options={a11yMenuOptions}
    --textColorHover="var(--clr-0)"
    --menuBgColor="var(--clr-100)"
    --bgColor="var(--clr-150)"
    --bgColorHover="var(--clr-700)"
    --bgColorTransition="var(--clr-250)"/>

<main id="main">
    <div class="twoCol maxWidth" id="intro">
        <div class="hero">

            <div class="header">
                <SvgIcon icon="logotype"/>
                <!-- tablet/mobile user auth buttons -->
                <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>

            </div>

            <h1>Recycling in <span class="accent">{city.name}, {city.state}</span></h1>
        </div>

        <div class="content">
            <div class="header">
                <!-- desktop user auth buttons -->
                <Button type="link" text="Log in" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
                <Button type="link" text="Sign up" href="#" --inlineSize="auto" --textColorHover="var(--clr-0)" --bgColor="var(--clr-150)" --bgColorHover="var(--clr-700)" --bgColorTransition="var(--clr-250)"/>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    :global(html, body) {
        background-color: var(--clr-50);
    }
</style>