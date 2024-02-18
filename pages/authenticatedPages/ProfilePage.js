import React from 'react';
import {View, Text, SafeAreaView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import UtilityCard from "../../components/UtilityCard";
import TextButton from "../../components/TextButton";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";

const ProfilePage = () => {

    const { userInfo } = useUser();
    const { logout } = useAuth();

    return userInfo ? (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1 flex my-4 justify-around">
                <View id="basic-info-container flex-col">
                    <View className="flex-row justify-center">
                        <Image source={require("../../assets/illustrations/female-avatar-illustration.png")} style={{width:100, height:100}}/>
                    </View>
                        <Text className="text-secondary font-bold text-4xl text-center">
                        {userInfo.firstName} {userInfo.lastName}
                    </Text>
                </View>

                <View id="personal-info-container" className="mx-7">
                    <Text className="text-secondary font-semibold text-lg">Personal Information</Text>
                    <View id="card-container" className="flex-col gap-y-1 mt-1">
                        <UtilityCard title={userInfo.email || "Email"} icon={<FontAwesome name="envelope" size={24}/>} disabled={true} />
                        <UtilityCard title={userInfo.phone || "Phone"} icon={<FontAwesome name="phone" size={24}/>} disabled={true} />
                        <UtilityCard title={userInfo.linkedin || "LinkedIn"} icon={<FontAwesome name="linkedin" size={24}/>} disabled={true} />
                    </View>
                </View>

                <View id="utilities-container" className="mx-7">
                    <Text className="text-secondary font-semibold text-lg">Utilities</Text>
                    <View id="card-container" className="flex-col mt-1">
                        <UtilityCard title={<FontAwesome name="chevron-right" size={12}/>} icon={<FontAwesome name="gear" size={24}/>} />
                    </View>
                </View>

                <View className="flex mx-7">
                    <TextButton title={"Logout"} onPress={logout}/>
                </View>
            </View>
        </SafeAreaView>
    ) : (
       <></>
    );
};

export default ProfilePage;
