<script context="module">
    export async function load({ params, fetch, session, stuff }) {
        return {
            // redirect "/cities" to search section on home page
            status: 302,
            redirect: "/#search"
        }
    }
</script>