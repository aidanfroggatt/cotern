import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyAos1eOmeDOE31XC4nPY8xXc0E9NeN5vTQ",
    authDomain: "cotern.firebaseapp.com",
    databaseURL: "https://cotern-default-rtdb.firebaseio.com",
    projectId: "cotern",
    storageBucket: "cotern.appspot.com",
    messagingSenderId: "525666418897",
    appId: "1:525666418897:web:ccc197c1cfeb4f659ac5f0",
    measurementId: "G-LGZTJENBY6"
};

const app = initializeApp(firebaseConfig);

export const myFirestore = getFirestore(app);
export const myAuth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
