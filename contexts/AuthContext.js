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

	const signIn = async (email, password) => await signInWithEmailAndPassword(myAuth, email, password).catch(console.error);

	const signOut = async () => await firebaseSignout(myAuth).catch(console.error);

	const signUpEmailAndPassword = async (firstName, lastName, email, password) => {
		const { user } = await createUserWithEmailAndPassword(myAuth, email, password).catch(console.error);
		if (!user) return;
		await setDoc(doc(collection(myFirestore, 'users'), user.uid), { firstName, lastName }).catch(console.error);
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
