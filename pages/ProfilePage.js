import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { collection, doc, getDoc } from "firebase/firestore";
import { myFirestore } from "../firebaseConfig";

const ProfilePage = () => {
    const { currentUser, signOut } = useAuth();
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
            const userDocRef = doc(collection(myFirestore, 'users'), userID);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                return userDocSnapshot.data();
            } else {
                console.log("User document does not exist");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
            return null;
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            console.log('User signed out');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text>User Info: {JSON.stringify(userInfo)}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
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
