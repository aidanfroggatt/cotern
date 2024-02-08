import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/pages/HomePage';
import CommunitiesPage from './components/pages/CommunitiesPage';
import AccountPage from './components/pages/AccountPage';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
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
    );
}