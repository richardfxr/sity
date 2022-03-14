<script context="module">
    export async function load({ params, fetch, session, stuff }) {
        return {
            // redirect "/city" to search section on home page
            status: 302,
            redirect: "/#search"
        }
    }
</script>