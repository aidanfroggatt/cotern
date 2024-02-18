import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CreateAccountPage from './pages/unauthenticatedPages/CreateAccountPage';
import LoginPage from './pages/unauthenticatedPages/LoginPage';
import HomePage from './pages/authenticatedPages/HomePage';
import LandingPage from './pages/unauthenticatedPages/LandingPage';
import ProfilePage from './pages/authenticatedPages/ProfilePage';
import CommunitiesPage from './pages/authenticatedPages/CommunitiesPage';
import { NavbarCommunitiesIcon, NavbarHomeIcon, NavbarProfileIcon } from './assets/Icons';
import {UserProvider} from "./contexts/UserContext";
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthenticatedNavigation = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#6366f1",
                tabBarInactiveTintColor: "#000000",
                tabBarShowLabel: false,
        }}>
            <BottomTab.Screen name="Home" component={HomePage} options={{tabBarIcon:NavbarHomeIcon}}/>
            <BottomTab.Screen name="Communities" component={CommunitiesPage} options={{tabBarIcon:NavbarCommunitiesIcon}}/>
            <BottomTab.Screen name="Profile" component={ProfilePage} options={{tabBarIcon:NavbarProfileIcon}}/>
        </BottomTab.Navigator>
    );
};
  
const UnauthenticatedNavigation = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
    </Stack.Navigator>
);

// If the user is authenticated, display the authenticated navigation, otherwise display the unauthenticated navigation
const AppNavigation = () => useAuth().currentUser ? <AuthenticatedNavigation /> : <UnauthenticatedNavigation />;

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <UserProvider>
                    <AppNavigation/>
                </UserProvider>
            </AuthProvider>
        </NavigationContainer>
    );
};
