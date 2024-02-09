import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/pages/HomePage';
import CommunitiesPage from './components/pages/CommunitiesPage';
import AccountPage from './components/pages/AccountPage';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Hi</Text>
        </View>
    );
}


// Commented out naviagator to test firestore in App.js
{/* 
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={HomePage}
            />
            <Tab.Screen
                name="Communities"
                component={CommunitiesPage}
            />
            <Tab.Screen
                name="Account"
                component={AccountPage}
            />
        </Tab.Navigator>
    </NavigationContainer> 
*/}