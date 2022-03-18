<script>
    // props
    export let id = "#";
    export let name = "N/A";
    export let state = "N/A";
</script>

<a class="cityCard" href="/city/{id}">
    <h2>{name}</h2>
    <span class="state text--xs">{state}</span>
</a>

<style lang="scss">
    .cityCard {
        display: block;
        padding: var(--pad-main);
        background-color: var(--clr-100);
        border-radius: var(--border-radius);

        .state {
            opacity: 0.85;
        }
    }
</style>