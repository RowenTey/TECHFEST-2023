import React, { useState, useCallback } from "react";
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

export default function CustomModal({ modalVisible, closeModal }) {
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

	return (
		<Modal
			animationType="slide"
			transparent
			visible={modalVisible}
			onRequestClose={() => closeModal()}
		>
			<View className="flex-1 items-center justify-center">
				<View className="flex flex-col p-7 gap-y-4 justify-center w-10/12 h-auto bg-blue-300 rounded-lg">
					<View
						style={
							Platform.OS === "ios"
								? { position: "relative", zIndex: 199 }
								: { position: "relative" }
						}
					>
						<Text className="mb-1">Category</Text>
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
						<Text className="mb-1">Location</Text>
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
						<Text className="mb-1">Description</Text>
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

					<TouchableOpacity
						onPress={() => closeModal()}
						className="self-center"
					>
						<Text>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
