<script context="module">
    import { getDbDoc } from "../../firebase/firestore";

    export async function load({ params, fetch, session, stuff }) {
        // get city id
        const id = params.id;
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
</script>

<h1>{id}</h1>

<style lang="scss">

</style>