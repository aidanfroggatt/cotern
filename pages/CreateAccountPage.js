import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import TextButton from '../components/TextButton';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import TextLink from "../components/TextLink";

const CreateAccountPage = () => {

	const { createAccountEmailAndPassword } = useAuth();
	const navigation = useNavigation();

    const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
    });

    const handleInputChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
    };
  
	return (
		<SafeAreaView className="flex-1 bg-primary">
			<View className="flex-1 flex justify-center my-4">
				<Text className="text-secondary font-bold text-4xl text-center">Create Account</Text>
				<View className="flex flex-col gap-y-2 m-7">
					<TextInput
						className="bg-gray-100 p-4 text-secondary rounded-2xl"
						placeholder="First Name"
						value={formData.firstName}
						onChangeText={(text) => handleInputChange('firstName', text)}
					/>
					<TextInput
						className="bg-gray-100 p-4 text-secondary rounded-2xl"
						placeholder="Last Name"
						value={formData.lastName}
						onChangeText={(text) => handleInputChange('lastName', text)}
					/>
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
					<TextButton onPress={() => createAccountEmailAndPassword({ email: formData.email, password: formData.password, firstName: formData.firstName, lastName: formData.lastName })} title={"Create Account"}/>
					<View className="flex-row justify-center">
						<TextLink onPress={() => navigation.navigate("Login")} title={"Already have an account?"}/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default CreateAccountPage;
