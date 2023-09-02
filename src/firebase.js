import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxLvbIt3eoEs68s6fthIA1BgTUPAGh2Sk",
    authDomain: "pomodro-timer-3d019.firebaseapp.com",
    projectId: "pomodro-timer-3d019",
    storageBucket: "pomodro-timer-3d019.appspot.com",
    messagingSenderId: "8971664109",
    appId: "1:8971664109:web:586d5e93619490f293aae4"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
