import React from "react";
import {SafeAreaView, Image} from "react-native";

const CommunitiesPage = () => {

	return (
		<SafeAreaView className="flex-1 justify-center items-center bg-primary">
			<Image source={require("../../assets/illustrations/people_illustration.png")} style={{width:200, height:200}}/>
		</SafeAreaView>
	);
};

export default CommunitiesPage;
