import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBYYLB7WLAV8IzOUNw7cLPabYpHbJRR0ug",
    authDomain: "hamster-combat-6e35d.firebaseapp.com",
    databaseURL: "https://hamster-combat-6e35d-default-rtdb.firebaseio.com",
    projectId: "hamster-combat-6e35d",
    storageBucket: "hamster-combat-6e35d.appspot.com",
    messagingSenderId: "1076838407532",
    appId: "1:1076838407532:web:1ee57abd064750e78de749",
    measurementId: "G-1D7M3JHF99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const realtimeDb = getDatabase(app);
// const analytics = getAnalytics(app);
