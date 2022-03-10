<script context="module">
    // following code runs on both server and client

    import { initFirebase } from '../firebase/init';

    console.log("should be able to see this");

    export async function load({ params, fetch, session, stuff }) {
        // initialize Firebase and Firestore
        let db = await initFirebase();

        return {
            props: {
            }
        }
    }
</script>

<script>

</script>

<slot />