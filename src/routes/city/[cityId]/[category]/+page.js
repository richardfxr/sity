/* === IMPORTS ============================ */
import { getDbDoc, getDbDocFromRef } from "../../../../firebase/firestore";

export async function load({ params, parent }) {
    // get city id
    let id = params.cityId;
    // get category
    let categoryId = params.category;
    // get parent data
    const data = await parent();
    // declare variables
    let loaded;
    let city;
    let guideline;

    // retrieve data from Firestore
    try {
        // get city document data
        city = await getDbDoc(data.db, "cities", id);
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

    // get category data
    let category = guideline.categories.find(cat => cat.id === categoryId);
    

    return {
        loaded,
        id,
        category,
        city
    };
}
