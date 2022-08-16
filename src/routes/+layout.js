/* === IMPORTS ============================ */
import { initFirebase } from '../firebase/init';
import { getDb } from '../firebase/firestore';

export async function load({ url }) {
    // initialize Firebase
    await initFirebase();

    // get Firestore database
    const db = await getDb();

    return {
            db,
            url,
    };
}
