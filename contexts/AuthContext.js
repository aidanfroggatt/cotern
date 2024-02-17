import React, { createContext, useContext, useState, useEffect } from 'react';
import { myAuth, myFirestore } from '../firebaseConfig';
import { signOut as firebaseLogout, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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

	const loginEmailAndPassword = async (email, password) => {
		try {
		  	await signInWithEmailAndPassword(myAuth, email, password);
		  	console.log("User signed in");
		} catch (error) {
		  	console.error(error);
		}
	};
	  
	const logout = async () => {
		try {
			await firebaseLogout(myAuth);
		  	console.log("User signed out");
		} catch (error) {
		  	console.error(error);
		}
	};
	  
	const createAccountEmailAndPassword = async (firstName, lastName, email, password) => {
		try {
			const { user } = await createUserWithEmailAndPassword(myAuth, email, password);
			console.log("Created user!");
			await setDoc(doc(collection(myFirestore, 'users'), user.uid), { firstName, lastName });
			console.log("Created user document!");
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
				createAccountEmailAndPassword
			}}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
