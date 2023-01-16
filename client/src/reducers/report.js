import { FETCH_REPORTS } from "../constants/actionTypes";

export const initialReportsState = {
	reports: [],
};

const ReportReducer = (state, action) => {
	const { type, payload } = action;
	console.log("payload", payload);

	switch (type) {
		case FETCH_REPORTS:
			return {
				...state,
				reports: payload.reports,
			};
		// case CREATE_ROOM:
		default:
			throw new Error(`No case for type ${type} found in ReportReducer.`);
	}
};

export default ReportReducer;
