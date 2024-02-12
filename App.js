import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

// App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { myAuth } from './firebaseConfig'; // Import the Firebase authentication object

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = myAuth.onAuthStateChanged(user => {
            if (user) {
                AsyncStorage.setItem('user', JSON.stringify(user)); // Store user data
            } else {
                AsyncStorage.removeItem('user'); // Remove user data if not logged in
            }
            setUser(user);
        });

        // Check AsyncStorage for stored user data on app start
        const checkStoredUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error reading user data from AsyncStorage:', error);
            }
        };
        checkStoredUser();

        return () => unsubscribe();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? 'Home' : 'Landing'}>
                <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingPage} />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomePage} />
                <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
                <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
