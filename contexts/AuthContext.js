import React, {createContext, useContext, useEffect, useState} from 'react';
import {myAuth, myFirestore} from '../firebase.Config';
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
			const { user } = await createAuthenticationEmailAndPassword(email, password);
			await createUserDocument(user, firstName, lastName);
		} catch (error) {
			console.error(error);
		}
	}

	const createAuthenticationEmailAndPassword = async (email, password) => {
		try {
			return await createUserWithEmailAndPassword(myAuth, email, password);
		} catch (error) {
			console.error(error);
		}
	};

	const createUserDocument = async (user, firstName, lastName) => {
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
				createAuthenticationEmailAndPassword,
				createUserDocument
			}}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
