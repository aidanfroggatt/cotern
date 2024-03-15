import { app, firebaseConfig } from '../firebase.config';
import { initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET
} from "@env";

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

// Mocking Firebase functions
jest.mock("firebase/app", () => ({
    initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(() => ({ type: 'LOCAL', synchronized: true })),
}));

jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(),
}));

// Mocking environment variables
const mockEnv = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

describe("Firebase Config", () => {
    beforeAll(() => {
        // Setting environment variables
        process.env = { ...process.env, ...mockEnv };
    });

    test("should initialize Firebase app", () => {
        expect(initializeApp).toHaveBeenCalledWith(expect.objectContaining(mockEnv));
    });


    test("should initialize Firestore", () => {
        expect(getFirestore).toHaveBeenCalledWith(app);
    });

    test("should initialize Auth with correct persistence", () => {
        expect(initializeAuth).toHaveBeenCalledWith(app, {
            persistence: { type: 'LOCAL', synchronized: true }
        });
    });

});
