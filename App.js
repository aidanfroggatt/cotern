import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthenticatedNavigation = () => (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
        <BottomTab.Screen name="Home" component={HomePage} />
        <BottomTab.Screen name="Profile" component={ProfilePage} />
    </BottomTab.Navigator>
);
  
  const UnauthenticatedNavigation = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
    </Stack.Navigator>
  );
  
  const AppNavigation = () => {
    const { currentUser } = useAuth();
  
    return (
        <>
            {currentUser ? <AuthenticatedNavigation /> : <UnauthenticatedNavigation />}
        </>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <AppNavigation/>
            </AuthProvider>
        </NavigationContainer>
    );
};
