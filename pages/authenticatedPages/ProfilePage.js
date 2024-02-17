import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput, Image} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import { collection, doc, getDoc } from "firebase/firestore";
import { myFirestore } from "../../firebaseConfig";
import TextLink from "../../components/TextLink";

const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userData = await getUserInfo(currentUser.uid);
            setUserInfo(userData);
        };
        fetchUserInfo();
    }, [currentUser.uid]);

    const getUserInfo = async (userID) => {
		try {
			const userDocSnapshot = await getDoc(doc(collection(myFirestore, 'users'), userID));
			return userDocSnapshot.exists() ? userDocSnapshot.data() : null;
		} catch (error) {
			console.error("Error fetching user information:", error);
		}
	};
	
	const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1 flex my-4">
                <View className="flex-row justify-center">
                    <Image source={require("../../assets/illustrations/female-avatar-illustration.png")} resizeMode="resize" style={{width:100, height:100}}/>
                </View>
                <Text className="text-secondary font-semibold text-xl text-center">{JSON.stringify(userInfo)}</Text>

            </View>
        </SafeAreaView>
    );
};

export default ProfilePage;
