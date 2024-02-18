import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import UtilityCard from "../../components/UtilityCard";
import TextButton from "../../components/TextButton";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import SlidingModal from "../../components/SlidingModal";

const ProfilePage = () => {

    const { userInfo } = useUser();
    const { logout } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return userInfo ? (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1 flex my-4 justify-around">
                <SlidingModal modalVisible={modalVisible} toggleModal={toggleModal} content={"test"}/>

                <View id="basic-info-container" className="flex-col gap-y-2">
                    <TouchableOpacity onPress={toggleModal}>
                        <View className="flex-row justify-center">
                            {userInfo.profilePicture ?
                                <Image source={{ uri: userInfo.profilePicture }} style={{ width: 100, height: 100 }} />
                                :
                                <FontAwesome name="user-circle" size={50} />
                            }
                        </View>
                    </TouchableOpacity>
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
