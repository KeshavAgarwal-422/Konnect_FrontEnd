// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjJJ5VbcfmtbdvL7FTN50Y4B762DBLNVA",
    authDomain: "twitterclone-422.firebaseapp.com",
    projectId: "twitterclone-422",
    storageBucket: "twitterclone-422.appspot.com",
    messagingSenderId: "72290629865",
    appId: "1:72290629865:web:b3fb44803b8141cee51878",
    measurementId: "G-K72NQMMT2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;