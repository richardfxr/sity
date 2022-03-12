import { browser } from '$app/env';

export async function initFirebase() {
    if (browser) {
        // following code only runs in a browser (browser === true)

        // browser-only imports (Firebase 9 SDK)
        const { initializeApp, getApps, getApp } = await import("firebase/app");
        // const { getFirestore } = await import ("firebase/firestore");

        if (getApps().length === 0) {
            // import firebaseConfig
            const { firebaseConfig } = await import("./config");

            // init firebase if one doesn't already exist
            initializeApp(firebaseConfig);
        } else {
            // get firebaseApp if it already exists
            getApp();
        }

        // initialize Firestore
        // const db = getFirestore();
        // return db;

    } else {
        // following code only runs on the server

        // server-only imports (Firebase Admin SDK)
        const { initializeApp, applicationDefault, cert, getApps, getApp } = await import('firebase-admin/app');
        // const { getFirestore, Timestamp, FieldValue } = await import('firebase-admin/firestore');

        if (getApps().length === 0) {
            // import service account private key
            const serviceAccount = process.env.FB_ADMIN_KEY;

            // init firebase if one doesn't already exist
            initializeApp({
                credential: cert(serviceAccount)
            });
        } else {
            // get firebaseApp if it already exists
            getApp();
        }

        // initialize Firestore
        // const db = getFirestore();
        // return db;
    }
}