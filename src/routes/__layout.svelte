<script context="module">
    // following code runs on both server and client

    import { initFirebase } from '../firebase/init';
    import { getDb, getAllDocs } from '../firebase/firestore';

    console.log("should be able to see this");

    export async function load({ params, fetch, session, stuff }) {
        // initialize Firebase
        await initFirebase();

        // get Firestore database
        const db = await getDb();

        return {
            stuff: {
                "db": db
            }
        }
    }
</script>

<script>

</script>

<slot />