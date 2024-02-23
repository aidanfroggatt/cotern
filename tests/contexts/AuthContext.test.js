import React from 'react';
import { Text } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { myAuth } from '../../firebase.Config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Mock Firebase functions
jest.mock('../../firebase.Config', () => ({
    myAuth: {
        onAuthStateChanged: jest.fn(),
    },
    myFirestore: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    serverTimestamp: jest.fn(),
    setDoc: jest.fn(),
}));

describe('AuthProvider', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Renders children when loading is false', async () => {
        myAuth.onAuthStateChanged.mockImplementationOnce((callback) => callback(null));
        const { queryByText } = render(
            <AuthProvider>
                <Text>Children</Text>
            </AuthProvider>
        );
        await waitFor(() => expect(queryByText('Children')).not.toBeNull());
    });

    test('Sets currentUser and setLoading to false after onAuthStateChanged callback', async () => {
        myAuth.onAuthStateChanged.mockImplementationOnce((callback) => callback({ uid: '123' }));
        const { queryByText } = render(
            <AuthProvider>
                <Text>Children</Text>
            </AuthProvider>
        );
        await waitFor(() => expect(queryByText('Children')).not.toBeNull());
        expect(myAuth.onAuthStateChanged).toHaveBeenCalledTimes(1);
    });

    test('loginEmailAndPassword calls signInWithEmailAndPassword', async () => {
        const email = 'test@example.com';
        const password = 'password123';

        myAuth.onAuthStateChanged.mockImplementationOnce((callback) => callback(null));
        signInWithEmailAndPassword.mockResolvedValueOnce();

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const loginButton = getByText('Login');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(myAuth, email, password);
        });
    });

    test('logout calls signOut', async () => {
        myAuth.onAuthStateChanged.mockImplementationOnce((callback) => callback({ uid: '123' }));
        signOut.mockResolvedValueOnce();

        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const logoutButton = getByText('Logout');
        fireEvent.press(logoutButton);

        await waitFor(() => {
            expect(signOut).toHaveBeenCalledWith(myAuth);
        });
    });
});

const TestComponent = () => {
    const { createAccountEmailAndPassword, loginEmailAndPassword, logout } = useAuth();

    return (
        <>
            <Text onPress={() => createAccountEmailAndPassword('John', 'Doe', 'test@example.com', 'password123')}>
                Create Account
            </Text>
            <Text onPress={() => loginEmailAndPassword('test@example.com', 'password123')}>
                Login
            </Text>
            <Text onPress={() => logout()}>
                Logout
            </Text>
        </>
    );
};
