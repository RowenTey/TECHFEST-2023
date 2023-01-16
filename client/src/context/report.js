import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { createContext, useContext, useReducer } from "react";
import { db, storage } from "../../firebaseConfig";
import { FETCH_REPORTS } from "../constants/actionTypes";
import ReportReducer, { initialReportsState } from "../reducers/report";

const ReportContext = createContext(null);
const { Provider } = ReportContext;

const ReportProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ReportReducer, initialReportsState);

	async function fetchReports() {
		const q = query(collection(db, "report"), orderBy("reportedDate"));
		let tmpReports = [];

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
			tmpReports = tmpReports.concat(newReport);
		});

		return tmpReports;
	}

	const getReports = async () => {
		const reports = await fetchReports();
		console.log(reports);
		dispatch({
			type: FETCH_REPORTS,
			payload: {
				reports,
			},
		});
	};

	// const createRoom = async (roomData) => {
	// 	try {
	// 		dispatch({
	// 			type: START_LOADING,
	// 		});

	// 		const { data: response } = await authAxios.post("/rooms", roomData);
	// 		const updatedRooms = state.rooms.concat(response.data);
	// 		const updatedTotal = updatedRooms.length;
	// 		dispatch({
	// 			type: CREATE_ROOM,
	// 			payload: {
	// 				rooms: updatedRooms,
	// 				total: updatedTotal,
	// 			},
	// 		});

	// 		dispatch({
	// 			type: END_LOADING,
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: END_LOADING,
	// 		});
	// 		console.log("Failed to create room", JSON.stringify(error));
	// 		switch (error.status) {
	// 			case "404":
	// 				throw new Error(error.response.data.message);
	// 			default:
	// 				throw new Error(error.response.data.message);
	// 		}
	// 	}
	// };

	const value = {
		reports: state,
		getReports,
	};

	console.log(value.reports);
	return <Provider value={value}>{children}</Provider>;
};

export { ReportContext, ReportProvider };
