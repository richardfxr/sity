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

    } else {
        // following code only runs on the server

        // server-only imports (Firebase Admin SDK)
        const { initializeApp, applicationDefault, cert, getApps, getApp } = await import('firebase-admin/app');
        // const { getFirestore, Timestamp, FieldValue } = await import('firebase-admin/firestore');

        if (getApps().length === 0) {
            let serviceAccount;

            // import service account private key
            if (import.meta.env.MODE === "development") {
                // get admin key through Vite if in development mode
                serviceAccount = JSON.parse(import.meta.env.VITE_FB_ADMIN_KEY);
                console.log(import.meta.env.VITE_FB_ADMIN_KEY);
            } else {
                // get admin key from Vercel env variables otherwise
                serviceAccount = JSON.parse(process.env.FB_ADMIN_KEY);
            }
            

            // init firebase if one doesn't already exist
            initializeApp({
                credential: cert(serviceAccount)
            });
        } else {
            // get firebaseApp if it already exists
            getApp();
        }
    }

    return;
}