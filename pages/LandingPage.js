import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TextButton from "../components/TextButton";
import TextLink from "../components/TextLink";

const LandingPage = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView testID="landing-page" className="flex-1 bg-primary">
            <View className="flex-1 flex justify-around my-4">
                <Text className="text-secondary font-bold text-4xl text-center">Let's get started</Text>
                <View className="flex-row justify-center">
                    <Image source={require("../assets/illustrations/landing_page-illustration.png")} resizeMethod="resize" style={{ width:350, height:350 }}/>
                </View>
                <View className="space-y-4 mx-7">
                    <TextButton onPress={() => navigation.navigate('CreateAccount')} title={"Create Account"}/>
                    <View className="flex-row justify-center">
                        <Text className="text-secondary font-semibold">Already have an account? </Text>
                        <TextLink onPress={() => navigation.navigate("Login")} title={"Login"}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LandingPage;
