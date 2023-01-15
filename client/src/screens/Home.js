import { StatusBar } from "expo-status-bar";
import { Button, View } from "react-native";

export default function Home() {
	return (
		<View className="flex-1 items-center justify-center bg-slate-700">
			<Button title="Take a picture" />
			<StatusBar style="auto" />
		</View>
	);
}
