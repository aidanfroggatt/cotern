import React, { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { collection, doc, getDoc } from "firebase/firestore";
import { myFirestore } from "../../firebaseConfig";
import { FontAwesome } from '@expo/vector-icons';
import UtilityCard from "../../components/UtilityCard";
import TextButton from "../../components/TextButton";

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
                   <Text className="text-secondary text-center">Member since: </Text>
               </View>

               <View id="personal-info-container" className="mx-7">
                   <Text className="text-secondary font-semibold text-lg">Personal Information</Text>
                   <View id="card-container" className="flex-col gap-y-1 mt-1">
                       <UtilityCard title={currentUser.email || "Email"} icon={<FontAwesome name="envelope" size={24}/>} />
                       <UtilityCard title={userInfo.phone || "Phone"} icon={<FontAwesome name="phone" size={24}/>} />
                       <UtilityCard title={userInfo.linkedin || "LinkedIn"} icon={<FontAwesome name="linkedin" size={24}/>} />
                   </View>
               </View>

               <View id="utilities-container" className="mx-7">
                   <Text className="text-secondary font-semibold text-lg">Utilities</Text>
                   <View id="card-container" className="flex-col mt-1">
                       <UtilityCard title={"Settings"} icon={<FontAwesome name="gear" size={24}/>} />
                   </View>
               </View>

               <View className="flex mx-7">
                   <TextButton title={"Logout"} onPress={handleLogout}/>
               </View>
           </View>
       </SafeAreaView>
   ) : (
       <></>
   );
};

export default ProfilePage;
