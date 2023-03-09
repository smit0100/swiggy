import { initializeApp } from "@firebase/app";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import { getMessaging } from "firebase/messaging";


const fierbaseConfig = {
    apiKey: "AIzaSyAj7olQ8vLI6hCOCXLxyHRwLJfBISOpoU4",
    authDomain: "swiggy-38368.firebaseapp.com",
    projectId: "swiggy-38368",
    storageBucket: "swiggy-38368.appspot.com",
    messagingSenderId: "180466138164",
    appId: "1:180466138164:web:5f1e5d15f4a371c6571e61",
    measurementId: "G-836C0S5734"
}


export const app = initializeApp(fierbaseConfig);
export const messaging = getMessaging(app);


