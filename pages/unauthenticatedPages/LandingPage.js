import React from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 flex justify-around my-4">
                <Text className="text-black font-bold text-4xl text-center">Let's get started</Text>
                <View className="flex-row justify-center">
                    <Image source={require("../../assets/illustrations/landing-page-illustration.png")} resizeMethod="resize" style={{ width:350, height:350 }}/>
                </View>
                <View className="space-y-4">
                    <TouchableOpacity className="py-3 bg-indigo-500 mx-7 rounded-xl" onPress={() => navigation.navigate('CreateAccount')}>
                        <Text className="text-xl font-bold text-center text-white">Create Account</Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-black font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="font-semibold text-indigo-500"> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LandingPage;
