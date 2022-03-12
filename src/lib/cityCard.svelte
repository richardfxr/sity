<script>
    // props
    export let id = "#";
    export let name = "N/A";
    export let state = "N/A";
</script>

<a class="cityCard" href="/cities/{id}">
    <h2>{name}</h2>
    <span class="state">{state}</span>
</a>

<style lang="scss">
    .cityCard {
        display: block;
        padding: 1.8rem;
        background-color: var(--clr-100);
        border-radius: 1rem;

        .state {
            opacity: 0.85;
        }
    }
</style>