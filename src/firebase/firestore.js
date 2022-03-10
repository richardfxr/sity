import { browser } from '$app/env';

/**
 * get Firestore database that works on both server and client
 * 
 * @returns sity Firestore database 
 */
export async function getDb() {
    if (browser) {
        // following code only runs in a browser (browser === true)

        // browser-only imports (Firebase 9 SDK)
        const { getFirestore } = await import ("firebase/firestore");

        // get and return database
        const db = getFirestore();
        return db;

    } else {
        // following code only runs on the server

        // server-only imports (Firebase Admin SDK)
        const { getFirestore, Timestamp, FieldValue } = await import('firebase-admin/firestore');

        // get and return database
        const db = getFirestore();
        return db;
    }
}


export async function getAllDocs(db, col) {
    if (browser) {
        // following code only runs in a browser (browser === true)

        // browser-only imports (Firebase 9 SDK)
        const { collection, getDocs } = await import ("firebase/firestore");

        const querySnapshot = await getDocs(collection(db, col));
        return querySnapshot;

    } else {
        // following code only runs on the server

        const snapshot = await db.collection(col).get();
        return snapshot;
    }
}