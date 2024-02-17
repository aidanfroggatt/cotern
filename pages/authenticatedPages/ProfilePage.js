import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import { collection, doc, getDoc } from "firebase/firestore";
import { myFirestore } from "../../firebaseConfig";

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
        <View className="flex-1 justify-center items-center px-8">
            <Text style={styles.title}>Profile</Text>
            <Text>{JSON.stringify(userInfo)}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default ProfilePage;
