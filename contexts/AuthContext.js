import React, {createContext, useContext, useEffect, useState} from 'react';
import {myAuth, myFirestore} from '../firebase.config';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseLogout} from 'firebase/auth';
import {collection, doc, serverTimestamp, setDoc} from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return myAuth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	const createAccountEmailAndPassword = async ({email, password, firstName, lastName}) => {
		try {
			const { user } = await createUserWithEmailAndPassword(myAuth, email, password);
			console.log("User created with email and password!");
			await createAccountDocument(user, firstName, lastName);
		} catch (error) {
			console.error(error);
		}
	}

	const createAccountDocument = async (user, firstName, lastName) => {
		try {
			// Create an object with the user data and timestamp
			const userData = {
				firstName,
				lastName,
				createdAt: serverTimestamp() // Add createdAt with serverTimestamp
			};
			await setDoc(doc(collection(myFirestore, 'users'), user.uid), userData);
			console.log("Created user document!");
		} catch (error) {
			console.error(error);
		}
	}

	const loginEmailAndPassword = async (email, password) => {
		try {
			await signInWithEmailAndPassword(myAuth, email, password);
		  	console.log("User logged in with email and password!");
		} catch (error) {
		  	console.error(error);
		}
	};
	  
	const logout = async () => {
		try {
			await firebaseLogout(myAuth);
		  	console.log("User logged out");
		} catch (error) {
		  	console.error(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				loginEmailAndPassword,
				logout,
				createAccountEmailAndPassword,
				createAccountDocument,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
