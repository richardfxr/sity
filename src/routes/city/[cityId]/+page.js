/* === IMPORTS ============================ */
import { getDbDoc, getDbDocFromRef } from "../../../firebase/firestore";

// throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ params, parent}) {
    // get city id
    let cityId = params.cityId;
    // get parent data
    const data = await parent();
    // declare variables
    let loaded;
    let city;
    let guideline;

    // retrieve data from Firestore
    try {
        // get city document data
        city = await getDbDoc(data.db, "cities", cityId);
        // get city guideline
        guideline = await getDbDocFromRef(city.guideline);

        // set loaded to true
        loaded = true;
    } catch(error) {
        // set loaded to false
        loaded = false;
        // log error
        console.error(error.message);
    }

    return {
        loaded,
        cityId,
        city,
        guideline
    };
}
