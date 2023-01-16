import { useContext, useEffect } from "react";
import { Text, Pressable, View, Image } from "react-native";
import { UserContext } from "../context/user";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Profile({ navigation }) {
	const [user, setUser] = useContext(UserContext);

	async function getUser() {
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const userCtx = docSnap.data();
			setUser({
				...userCtx,
				uid: user.uid,
			});
			console.log("Document data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<View className="flex-1 items-center justify-center bg-slate-700">
			<View className="rounded bg-white w-full h-full p-3 pt-16">
				<View className="flex-row w-full p-3 justify-between items-center">
					<Image
						source={{
							width: 80,
							height: 80,
							uri: "https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg",
						}}
					/>
					<Text className="text-blue-600 text-3xl font-bold">
						{user.username ? user.username : "user"}
					</Text>
				</View>

				<View className="rounded-3xl bg-gray-200 p-4 flex-grow">
					<Text className="text-blue-600 text-2xl font-semibold self-start p-2 border-b-2 w-full h-fit">
						Username: {user.username ? user.username : "user"}
					</Text>
					<Text className="text-blue-600 text-2xl font-semibold self-start p-2 border-b-2 w-full h-fit">
						Tokens
					</Text>
					<Text className="text-blue-600 text-2xl font-semibold self-start p-2 border-b-2 w-full h-fit">
						Pending Verifications
					</Text>
					<View className="flex-grow" />
					<Pressable
						onPress={() => navigation.navigate("Auth")}
						className="rounded bg-white w-2/5 p-2 self-end mt-2"
					>
						<Text className="text-blue-600 text-xl font-medium self-center rounded-xl">
							Log Out
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
