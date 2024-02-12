import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen options={{headerShown: false}} name="Landing" component={LandingPage}/>
                <Stack.Screen options={{headerShown: false}} name="Home" component={HomePage}/>
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginPage} />
                <Stack.Screen options={{headerShown: false}} name="Signup" component={SignupPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
