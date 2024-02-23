import { app, firebaseConfig } from '../firebase.config';
import { initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
    FIREBASE_API_KEY: "your-api-key",
    FIREBASE_AUTH_DOMAIN: "your-auth-domain",
    FIREBASE_DATABASE_URL: "your-database-url",
    FIREBASE_PROJECT_ID: "your-project-id",
    FIREBASE_STORAGE_BUCKET: "your-storage-bucket",
    FIREBASE_MESSAGING_SENDER_ID: "your-messaging-sender-id",
    FIREBASE_APP_ID: "your-app-id",
    FIREBASE_MEASUREMENT_ID: "your-measurement-id",
};

describe("Firebase Config", () => {
    beforeAll(() => {
        // Setting environment variables
        process.env = { ...process.env, ...mockEnv };
    });

    test("should initialize Firebase app", () => {
        expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
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
