import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const ProfilePage = () => {
  const { currentUser, signOut } = useAuth();

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
		<Text>Email: {currentUser.email}</Text>
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
