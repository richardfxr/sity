<script>
    import A11yMenu from '$lib/a11yMenu.svelte';

    const a11yMenuOptions = [
        {text: "Skip to content.", href: "#main"},
        {text: "Navigation.", href: "#"},
        {text: "Settings.", href: "#"},
        {text: "Accessibility Help.", href: "#"}
    ]
</script>



<A11yMenu 
    options={a11yMenuOptions}
    --bgColor="var(--clr-100)"
    --bgColorHover="var(--clr-50)"/>
<h1>sity.earth v0.2.0 pre-alpha</h1>
<p>Page still in the works. See current published build at <a href="https://sity.earth/" target="_blank">sity.earth</a>.</p>
