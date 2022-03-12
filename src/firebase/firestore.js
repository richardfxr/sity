import { browser } from '$app/env';

/**
 * Returns Firestore database.
 * Works on both server and client.
 * 
 * @returns {object} Firestore database object
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


/**
 * Returns all documents in the spcified collection in the Firestore database.
 * Works on both server and client.
 * 
 * @param {object} db Firestore database object returned by getDB()
 * @param {string} col name of collection 
 * @returns {array} array with each document as an object (including document.id and everything in document.data())
 */
export async function getDbDocs(db, col) {
    if (browser) {
        // following code only runs in a browser (browser === true)

        // browser-only imports (Firebase 9 SDK)
        const { collection, getDocs } = await import ("firebase/firestore");

        const querySnapshot = await getDocs(collection(db, col));

        // returns arrayified querySnapshot so it's easier to work with in Svelte
        return arrayify(querySnapshot);

    } else {
        // following code only runs on the server

        const snapshot = await db.collection(col).get();

        // returns arrayified querySnapshot so it's easier to work with in Svelte
        return arrayify(snapshot);
    }
}


export async function getDbDoc(db, col, docId) {
    if (browser) {
        // following code only runs in a browser (browser === true)

        // browser-only imports (Firebase 9 SDK)
        const {doc, getDoc} = await import("firebase/firestore");

        const docRef = doc(db, col, docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // throw error if doc does not exist
            throw new Error("document does not exist");
        }

        console.log("docSnap.data():", docSnap.data());
        // return doc data
        return docSnap.data();

    } else {
        // following code only runs on the server

        const docRef = db.collection(col).doc(docId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            // throw error if doc does not exist
            throw new Error("document does not exist");
        }

        console.log("docSnap.data():", docSnap.data());
        // return doc data
        return docSnap.data();
    }
}


/**
 * Returns the whole collection as a array of objects.
 * Works on both server and client.
 * 
 * @param {object} obj Firestore snapshot of a collection
 * @returns {array} array with each document in the collection as an object (including document.id and everything in document.data())
 */
function arrayify(obj) {
    // create final array
    const array = [];

    // declare index counter
    let i = 0;

    obj.forEach((elem) => {
        // declare temporary element object
        let elemObj = { id: elem.id };

        // add all properties in elem.data() to elemObj
        for (const prop in elem.data()) {
            elemObj[prop] = elem.data()[prop];
        }

        // assign elemObj to corresponsing index in array
        array[i] = elemObj;

        // increment counter
        i++;
    });

    return array;
}