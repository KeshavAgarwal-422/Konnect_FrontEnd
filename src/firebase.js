import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA7UrWzfYsLegc__OPIXGH9lYUysgCkCbM",
    authDomain: "konnect-422.firebaseapp.com",
    projectId: "konnect-422",
    storageBucket: "konnect-422.firebasestorage.app",
    messagingSenderId: "164802272291",
    appId: "1:164802272291:web:e17dbe1c94fec98f8e2596"
};

const app = initializeApp(firebaseConfig);
export default app;