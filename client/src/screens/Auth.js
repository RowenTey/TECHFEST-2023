import React, { useContext, useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { UserContext } from "../context/user";

export default function Auth({ navigation }) {
	const [isSignUp, SetIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [user, setUser] = useContext(UserContext);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				// console.log(user);
				setUser(user);
				navigation.navigate("HomeTab");
			}
		});

		return unsubscribe;
	}, []);

	function handleSignUp() {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredentials) => {
				const user = userCredentials.user;
				await createUser(user);
				console.log("Registered with:", user.email);
				console.log(user);
			})
			.catch((error) => alert(error.message));
	}

	function handleLogin() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log("Logged in with:", user.email);
				console.log(user);
			})
			.catch((error) => alert(error.message));
	}

	function toggleSignUpLogin() {
		SetIsSignUp(!isSignUp);
	}

	async function createUser(user) {
		try {
			const docRef = await setDoc(doc(db, "users", user.uid), {
				username: username,
				email: user.email,
				walletAddress: "",
			});
			console.log("Document written with ID: ", docRef);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	return (
		<KeyboardAvoidingView
			className="flex-1 justify-center items-center"
			behavior="padding"
		>
			<Text className="text-blue-500 font-extrabold text-4xl">SGReporter</Text>

			<View className="w-4/5 mt-12">
				{isSignUp && (
					<TextInput
						placeholder="Username"
						value={username}
						onChangeText={(text) => setUsername(text)}
						className="bg-white p-4 rounded-xl mt-1"
					/>
				)}
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					className="bg-white p-4 rounded-xl mt-1"
				/>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					className="bg-white p-4 rounded-xl mt-2"
					secureTextEntry
				/>
			</View>

			<View className="w-3/5 justify-center items-center mt-10">
				{isSignUp ? (
					<>
						<TouchableOpacity
							onPress={handleSignUp}
							className="bg-white border-blue-500 border-2 mt-1 w-4/5 p-3 rounded-2xl items-center"
						>
							<Text className="text-blue-500 font-bold text-base">
								Register
							</Text>
						</TouchableOpacity>
						<Text
							onPress={() => toggleSignUpLogin()}
							className="text-gray-600 font-medium text-base mt-3 w-full text-center"
						>
							Already have an account?{"\n"}
							Login
						</Text>
					</>
				) : (
					<>
						<TouchableOpacity
							onPress={handleLogin}
							className="bg-blue-500 w-4/5 p-3 rounded-2xl items-center"
						>
							<Text className="text-white font-bold text-base">Login</Text>
						</TouchableOpacity>
						<Text
							onPress={() => toggleSignUpLogin()}
							className="text-gray-600 font-medium text-base mt-3 w-full text-center"
						>
							Don't have an account?{"\n"}
							Sign up
						</Text>
					</>
				)}
			</View>
		</KeyboardAvoidingView>
	);
}
