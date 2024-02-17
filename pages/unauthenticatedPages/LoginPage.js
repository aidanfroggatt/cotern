import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import TextLink from "../../components/TextLink";

const LoginPage = () => {

    const { loginEmailAndPassword } = useAuth();
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        try {
            await loginEmailAndPassword(formData.email, formData.password);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
  
    return (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1 flex justify-center my-4">
                <Text className="text-secondary font-bold text-4xl text-center">Login</Text>
                <View className="flex flex-col gap-y-2 m-7">
                    <TextInput
                        className="bg-gray-100 p-4 text-secondary rounded-2xl"
                        placeholder="Email"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                    />
                    <TextInput
                        className="bg-gray-100 p-4 text-secondary rounded-2xl"
                        placeholder="Password"
                        secureTextEntry={true}
                        value={formData.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                    />
                </View>
                <View className="space-y-4 mx-7">
                    <Button onPress={handleLogin} title={"Login"}/>
                    <View className="flex-row justify-center">
                        <TextLink onPress={() => navigation.navigate("CreateAccount")} title={"Don't have an account?"}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginPage;
