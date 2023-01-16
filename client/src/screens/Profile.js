import { Text, Pressable, View, Image } from "react-native";

export default function Profile({ navigation }) {
	const name = "PlaceHolderName";
	const username = "PlaceHolderUserName";

	return (
		<View className="flex-1 items-center justify-center bg-slate-700">
			<View className="rounded bg-white w-full h-full p-3 pt-16">
				<View className="flex-row w-full p-3">
					<Text className="text-blue-600 text-3xl font-bold self-center flex-grow">{name}</Text>
					<Image className="w-16 h-16" source={require('./a.png')} />
				</View>
				<View className="rounded-3xl bg-gray-200 p-4 flex-grow">
					<Text className="text-blue-600 text-2xl font-semibold self-start p-2 border-b-2 w-full h-fit">Username: {username}</Text>
					<Text className="text-blue-600 text-2xl font-semibold self-start p-2 border-b-2 w-full h-fit">Tokens</Text>
					<Text className="text-blue-600 text-2xl font-semibold self-start p-2 border-b-2 w-full h-fit">Pending Verifications</Text>
					<View className="flex-grow"/>
					<Pressable
						onPress={() => navigation.navigate("Auth")}
						className="rounded bg-white w-20 p-2 self-end mt-2">
						<Text className="text-blue-600 text-xl self-center">Log Out</Text>
					</Pressable>
				</View>
			</View>
			
		</View>
	);
}
