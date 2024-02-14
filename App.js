import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingPage} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={HomePage} />
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
                    <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupPage} />
                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    );
}
