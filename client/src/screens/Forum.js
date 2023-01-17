import { useContext, useEffect, useState } from "react";
import {
	Text,
	Pressable,
	View,
	Image,
	ScrollView,
	FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../context/user";
import { db, storage } from "../../firebaseConfig";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Spinner from "../components/Spinner";
import { ReportContext } from "../context/report";

export default function Forum({ navigation }) {
	const [user, setUser] = useContext(UserContext);
	const [reports, setReports] = useState([]);
	// const { reports, getReports } = useContext(ReportContext);
	const [loading, setLoading] = useState(false);

	async function getReports() {
		setLoading(true);
		const q = query(collection(db, "report"), orderBy("reportedDate"));
		const tmpReports = [];

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (doc) => {
			// doc.data() is never undefined for query doc snapshots
			let image;
			await getDownloadURL(ref(storage, `images/${doc.id}`))
				.then((url) => {
					// `url` is the download URL for 'images/${doc.id}'
					image = url;
				})
				.catch((error) => {
					console.error(error);
				});

			const data = doc.data();
			const newReport = {
				...data,
				image,
				id: doc.id,
			};
			tmpReports.push(newReport);
		});

		setReports(tmpReports);
		setLoading(false);
	}

	useEffect(() => {
		getReports();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<View className="flex-1 flex-col pt-5">
			<Text className="text-blue-500 font-extrabold text-3xl text-center my-4">
				Forum
			</Text>
			{/* {reports.length > 0 && ( */}
			<FlatList
				data={reports}
				// style={{ flex: 1, width: "100%" }}
				// contentContainerStyle={{ alignItems: "center" }}
				keyExtractor={(item, index) => index}
				key={"_"}
				renderItem={({ item }) => <ForumPost report={item} />}
			/>
		</View>
	);
}

function ForumPost({ report }) {
	const { image, category, location, description } = report;
	console.log(report);

	return (
		<View className="flex-row items-center justify-between px-8 py-5 border-t-2 h-auto border-blue-500 gap-1">
			<Image
				className='m-0'
				source={{
					width: 50,
					height: 50,
					uri: "https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg",
				}}
			/>

			<View className="flex flex-col justify-start gap-2 w-[125px]">
				<Text>{category}</Text>
				<Text>{location}</Text>
				<Text>{description}</Text>
			</View>

			<View className="flex-row items-center gap-1">
				<MaterialCommunityIcons
					name="arrow-up-bold"
					size={35}
					color={'rgb(59 130 246)'}
				/>
				<Text>10</Text>

				<Image source={{ uri: image }} />
			</View>
		</View>
	);
}
