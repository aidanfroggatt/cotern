import { View, Text } from 'react-native';
import { getUsers } from './controllers/usersController';

export default function App() {

    getUsers();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Hi</Text>
        </View>
    );
};
