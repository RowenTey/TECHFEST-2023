import {
	TouchableOpacity,
	View,
	Text,
	Button,
	ImageBackground,
} from "react-native";
import { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";

export default function Home() {
	const camera = useRef(null);
	const [type, setType] = useState(CameraType.back);
	const [capturedImage, setCapturedImage] = useState(null);
	const [previewVisible, setPreviewVisible] = useState(false);
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

	async function takePicture() {
		try {
			const photo = await camera.current.takePictureAsync();
			console.log(photo);
			setPreviewVisible(true);
			setCapturedImage(photo);
		} catch (error) {
			console.error(error);
		}
	}

	function savePhoto(photo) {}

	function retakePicture() {
		setCapturedImage(null);
		setPreviewVisible(false);
	}

	return (
		<View className="flex-1 justify-center">
			{capturedImage && previewVisible ? (
				<CameraPreview
					photo={capturedImage}
					savePhoto={savePhoto}
					retakePicture={retakePicture}
				/>
			) : (
				<Camera className="flex-1" type={type} ref={camera}>
					<View className="flex-1 flex-row bg-transparent m-16">
						<TouchableOpacity
							className="flex-1 self-end items-center"
							onPress={takePicture}
						>
							<Text className="text-white">Take picture</Text>
						</TouchableOpacity>
					</View>
				</Camera>
			)}
		</View>
	);
}

function CameraPreview({ photo, retakePicture, savePhoto }) {
	console.log("photo", photo);
	return (
		<View className="bg-transparent flex-1 w-full h-full">
			<ImageBackground source={{ uri: photo && photo.uri }} className="flex-1">
				<View className="flex-1 flex-col p-3 justify-end">
					<View className="flex-row p-3 justify-between">
						<TouchableOpacity
							onPress={retakePicture}
							className="w-auto h-auto items-center rounded"
						>
							<Text className="text-white text-base">Re-take</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={savePhoto}
							className="w-auto h-auto items-center rounded"
						>
							<Text className="text-white text-base">Save photo</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}
