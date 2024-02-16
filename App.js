import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    const { currentUser } = useAuth();
    return (
        <>
            {
                currentUser && (
                    <Tab.Navigator>
                        <Tab.Screen name="Landing" component={LandingPage} />
                        <Tab.Screen name="Home" component={HomePage} />
                        <Tab.Screen name="Login" component={LoginPage} />
                        <Tab.Screen name="Signup" component={SignupPage} />
                    </Tab.Navigator>
                ) 
            }
        </>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <AppNavigation/>
            </AuthProvider>
        </NavigationContainer>
    );
};
