import React, { createContext, useContext, useState, useEffect } from 'react';
import { myAuth } from '../firebaseConfig';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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
      await signOut(myAuth);
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(myAuth, email, password);
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
        signUp
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
