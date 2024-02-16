import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
	
	const { currentUser } = useAuth();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Profile</Text>
			<Text>{JSON.stringify(currentUser)}</Text>
		</View>
	);
};

export default ProfilePage;
