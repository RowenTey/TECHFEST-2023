import { TouchableOpacity, View, Text, Button } from "react-native";
import { useState } from "react";
import { Camera, CameraType } from "expo-camera";

export default function Home() {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View className="flex-1 items-center justify-center bg-white">
				<Text>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="Grant Permission" />
			</View>
		);
	}

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	return (
		<View className="flex-1 justify-center">
			<Camera className="flex-1" type={type}>
				<View className="flex-1 flex-row bg-transparent m-16">
					<TouchableOpacity
						className="flex-1 self-end items-center"
						onPress={toggleCameraType}
					>
						<Text className="text-white">Flip Camera</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}
