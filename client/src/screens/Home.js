import {
	TouchableOpacity,
	View,
	Text,
	Button,
	ImageBackground,
} from "react-native";
import { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import ReportModal from "../components/ReportModal";

export default function Home() {
	const camera = useRef(null);
	const [type, setType] = useState(CameraType.back);
	const [capturedImage, setCapturedImage] = useState(null);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [visible, setVisible] = useState(false);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	// Camera permissions are still loading
	if (!permission) {
		return <View />;
	}

	// Camera permissions are not granted yet
	if (!permission.granted) {
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
			setPreviewVisible(true);
			setCapturedImage(photo);
		} catch (error) {
			console.error(error);
		}
	}

	function makeReport(photo) {
		setVisible(true);
	}

	function retakePicture() {
		setCapturedImage(null);
		setPreviewVisible(false);
	}

	function closeModal() {
		setVisible(false);
		retakePicture();
	}

	return (
		<View className="flex-1 justify-center">
			<ReportModal
				modalVisible={visible}
				closeModal={closeModal}
				photo={capturedImage}
			/>
			{capturedImage && previewVisible ? (
				<CameraPreview
					photo={capturedImage}
					makeReport={makeReport}
					retakePicture={retakePicture}
				/>
			) : (
				<Camera className="flex-1 items-center" type={type} ref={camera}>
					<View className="w-1/2 flex-1 flex-row m-16">
						<TouchableOpacity
							className="flex-1 self-end items-center bg-white rounded-full p-3 w-2"
							onPress={takePicture}
						>
							<Text className="text-blue-500 font-extrabold text-lg">
								Take picture
							</Text>
						</TouchableOpacity>
					</View>
				</Camera>
			)}
		</View>
	);
}

function CameraPreview({ photo, retakePicture, makeReport }) {
	return (
		<View className="bg-transparent flex-1 w-full h-full">
			<ImageBackground source={{ uri: photo && photo.uri }} className="flex-1">
				<View className="flex-1 flex-col p-3 justify-end">
					<View className="flex-row py-3 px-5 justify-between">
						<TouchableOpacity
							onPress={retakePicture}
							className="w-auto h-auto items-center rounded-full bg-white p-3"
						>
							<Text className="text-black text-base font-bold">Re-take</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={makeReport}
							className="w-auto h-auto items-center rounded-full bg-white p-3"
						>
							<Text className="text-black text-base font-bold">Continue</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}
