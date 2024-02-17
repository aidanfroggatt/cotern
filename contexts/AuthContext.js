import React, { createContext, useContext, useState, useEffect } from 'react';
import { myAuth, myFirestore } from '../firebaseConfig';
import { signOut as firebaseSignout, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = myAuth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const signIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(myAuth, email, password);
		} catch (error) {
			console.error(error);
		}
	};

	const signOut = async () => {
		try {
			await firebaseSignout(myAuth);
		} catch (error) {
			console.error(error);
		}
	};

	const signUpEmailAndPassword = async (firstName, lastName, email, password) => {
		try {
			const { user } = await createUserWithEmailAndPassword(myAuth, email, password);
			console.log("User created successfully!");			
			const usersCollection = collection(myFirestore, 'users');
			const userDocRef = doc(usersCollection, user.uid);
			await setDoc(userDocRef, {
				firstName: firstName,
				lastName: lastName,
			});
			console.log("User document created successfully!");

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				signIn,
				signOut,
				signUpEmailAndPassword
			}}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
