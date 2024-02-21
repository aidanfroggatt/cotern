import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import UtilityCard from "../components/UtilityCard";
import TextButton from "../components/TextButton";
import {useUser} from "../contexts/UserContext";
import {useAuth} from "../contexts/AuthContext";
import SlidingModal from "../components/SlidingModal";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = () => {

    const { userInfo, updateUserInfo } = useUser();
    const { logout } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                "Sorry, we need camera roll permission to upload images."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            updateUserInfo(userInfo.uid, { profilePicture: result.assets[0].uri });
        }
    };


    return userInfo ? (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1 flex my-4 justify-around">

                <View id="basic-info-container" className="flex-col gap-y-2">
                    <View className="flex-row justify-center">
                        {userInfo.profilePicture ?
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image source={{ uri: userInfo.profilePicture }} style={{width:100, height:100}} className="rounded-full" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <FontAwesome name="user-circle" size={50} />
                            </TouchableOpacity>
                        }
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

                <SlidingModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <View className="m-8">
                        <TextButton title={"Update profile photo"} onPress={pickImage}/>
                    </View>
                </SlidingModal>

            </View>
        </SafeAreaView>
    ) : (
       <></>
    );
};

export default ProfilePage;
