import React from "react";
import {Text, SafeAreaView} from "react-native";
import {useUser} from "../../contexts/UserContext";

const HomePage = () => {

	return (
		<SafeAreaView className="flex-1 justify-center items-center">
			<Text>Home</Text>
		</SafeAreaView>
	);
};

export default HomePage;
