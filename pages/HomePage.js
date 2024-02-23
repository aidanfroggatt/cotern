import React from "react";
import {Image, SafeAreaView} from "react-native";

const HomePage = () => {

	return (
		<SafeAreaView testID="home-page" className="flex-1 justify-center items-center bg-primary">
			<Image source={require("../assets/illustrations/sweet_home_illustration.png")} style={{width:200, height:200}}/>
		</SafeAreaView>
	);
};

export default HomePage;
