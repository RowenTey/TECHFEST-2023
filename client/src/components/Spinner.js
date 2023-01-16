import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Spinner() {
	return (
		<View className="flex-1 justify-center items-center bg-blue-500">
			<ActivityIndicator size="large" color="#FFF" />
		</View>
	);
}
