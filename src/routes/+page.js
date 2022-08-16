/* === IMPORTS ============================ */
import { getDbDocs } from '../firebase/firestore';

export async function load({ parent }) {
    // get Firestore database from +layout.js
    const data = await parent();

    // get all docs from 'cities' collection
    const cities = await getDbDocs(data.db, "cities");

    return {
        cities
    };
}
