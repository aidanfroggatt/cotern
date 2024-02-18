import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import UtilityCard from "../../components/UtilityCard";
import TextButton from "../../components/TextButton";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";

const ProfilePage = () => {

    const { userInfo } = useUser();
    const { logout } = useAuth();


    const [modalVisible, setModalVisible] = useState(false);
    const [backgroundAnimation] = useState(new Animated.Value(0));
    const [contentAnimation] = useState(new Animated.Value(0));

    const toggleModal = () => {
        if (modalVisible) {
            Animated.parallel([
                Animated.timing(backgroundAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(contentAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start(() => setModalVisible(false));
        } else {
            setModalVisible(true);
            Animated.parallel([
                Animated.timing(backgroundAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(contentAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start();
        }
    };

    const backgroundOpacity = backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
    });

    const screenHeight = Dimensions.get('window').height;
    const contentHeight = screenHeight * 0.3; // Minimum 30% of screen height

    const contentTranslateY = contentAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [contentHeight, 0],
    });

    return userInfo ? (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1 flex my-4 justify-around">

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

                <Modal
                    transparent
                    visible={modalVisible}
                    onRequestClose={toggleModal}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            opacity: backgroundOpacity,
                        }}
                    >
                        <TouchableOpacity className="flex-1" onPress={toggleModal} />
                    </Animated.View>

                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            height: contentHeight,
                            transform: [{ translateY: contentTranslateY }],
                        }}
                    >
                        <View className="items-center py-4">
                            <Text className="text-secondary font-bold text-2xl">
                                Modal Content
                            </Text>
                        </View>
                    </Animated.View>
                </Modal>

            </View>
        </SafeAreaView>
    ) : (
       <></>
    );
};

export default ProfilePage;
