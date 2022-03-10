<script context="module">
    export async function load({ params, fetch, session, stuff }) {
        const id = params.id;

        return {
            props: {
                id
            }
        };
    }
</script>

<script>
    export let id = "unknown";
</script>

<h1>{id}</h1>

<style lang="scss">

</style>