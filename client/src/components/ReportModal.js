import React, { useState, useCallback, useContext } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	TextInput,
	Keyboard,
	Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { UserContext } from "../context/user";
import { decode } from "base-64";

if (typeof atob === "undefined") {
	global.atob = decode;
}

export default function ReportModal({ modalVisible, closeModal, photo }) {
	const [user, setUser] = useContext(UserContext);
	const [url, setURL] = useState("");

	const [text, setText] = useState("");

	const [openCategory, setOpenCategory] = useState(false);
	const [category, setCategory] = useState(null);
	const [categories, setCategories] = useState([
		{ label: "HDB", value: "hdb" },
		{ label: "University", value: "university" },
	]);

	const [openLocation, setOpenLocation] = useState(false);
	const [location, setLocation] = useState(null);
	const [locations, setLocations] = useState([
		{ label: "NTU", value: "ntu" },
		{ label: "NUS", value: "nus" },
	]);

	const onCategoryOpen = useCallback(() => {
		setOpenLocation(false);
	}, []);

	const onLocationOpen = useCallback(() => {
		setOpenCategory(false);
	}, []);

	async function uploadImageAsync(uri) {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});

		const imageRef = ref(storage, "images/report4");
		uploadBytes(imageRef, blob).then((snapshot) => {
			console.log("Uploaded a blob!");
		});
		blob.close();
	}

	async function onSubmit() {
		try {
			const docRef = await setDoc(doc(db, "report"), {
				reportedDate: new Date(),
				reporterID: user.uid,
				category: category,
				location: location,
				description: text,
				verified: false,
			});
			await uploadImageAsync(photo.uri);
			console.log("Document written with ID: ", docRef.id);
			closeModal();
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	return (
		<Modal
			animationType="slide"
			transparent
			visible={modalVisible}
			onRequestClose={() => closeModal()}
		>
			<View className="flex-1 items-center justify-center">
				<View className="flex flex-col p-7 gap-y-4 justify-center w-10/12 h-auto bg-blue-400 rounded-xl">
					<View
						style={
							Platform.OS === "ios"
								? { position: "relative", zIndex: 199 }
								: { position: "relative" }
						}
					>
						<Text className="mb-2 font-bold">Category</Text>
						<DropDownPicker
							zIndex={200}
							open={openCategory}
							onOpen={onCategoryOpen}
							value={category}
							items={categories}
							setOpen={setOpenCategory}
							setValue={setCategory}
							setItems={setCategories}
						/>
					</View>

					<View
						style={
							Platform.OS === "ios"
								? { position: "relative", zIndex: 99 }
								: { position: "relative" }
						}
					>
						<Text className="mb-2 font-bold">Location</Text>
						<DropDownPicker
							zIndex={100}
							open={openLocation}
							onOpen={onLocationOpen}
							value={location}
							items={locations}
							setOpen={setOpenLocation}
							setValue={setLocation}
							setItems={setLocations}
						/>
					</View>

					<View>
						<Text className="mb-2 font-bold">Description</Text>
						<TextInput
							className="h-52 border-black border-2 p-2 bg-white rounded-md"
							onChangeText={(text) => setText(text)}
							value={text}
							multiline={true}
							numberOfLines={15}
							onSubmitEditing={Keyboard.dismiss}
							editable={true}
							placeholder="Enter text here"
						/>
					</View>

					<TouchableOpacity onPress={onSubmit} className="self-center">
						<Text className="font-extrabold text-lg text-white">Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
