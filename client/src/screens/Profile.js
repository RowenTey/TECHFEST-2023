import { Text, Pressable, View } from "react-native";

export default function Profile({ navigation }) {
	return (
		<View className="flex-1 items-center justify-center bg-slate-700">
			<Pressable
				className="rounded bg-white p-5"
				// onPress={() => navigation.push("Profile")}
			>
				<Text className="text-blue-600">Profile</Text>
			</Pressable>
		</View>
	);
}
