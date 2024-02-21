import React, {createContext, useContext, useEffect, useState} from 'react';
import {myFirestore} from '../firebase.Config';
import {collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import {useAuth} from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { currentUser } = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (currentUser) {
                const userData = await getUserInfo(currentUser.uid);
                // User ID and email are the only information taken from the currentUser
                // The rest of the user information is fetched from the firestore users collection
                setUserInfo({ uid: currentUser.uid, email: currentUser.email, ...userData });
            }
        };
        fetchUserInfo();
    }, [currentUser]);

    const getUserInfo = async (userID) => {
        try {
            const userDocSnapshot = await getDoc(doc(collection(myFirestore, 'users'), userID));
            return userDocSnapshot.exists() ? userDocSnapshot.data() : null;
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    };

    const updateUserInfo = async (userID, updatedUserInfo) => {
        try {
            const userRef = doc(collection(myFirestore, 'users'), userID);
            await updateDoc(userRef, updatedUserInfo);
            setUserInfo({ ...userInfo, ...updatedUserInfo });
        } catch (error) {
            console.error("Error updating user information:", error);
        }
    }

    return (
        <UserContext.Provider
            value={{
                userInfo,
                getUserInfo,
                updateUserInfo
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
