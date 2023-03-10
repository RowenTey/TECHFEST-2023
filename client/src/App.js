import { LogBox } from "react-native";
import { ReportProvider } from "./context/report";

import { UserProvider } from "./context/user";
import Navigation from "./navigation";

export default function App() {
	LogBox.ignoreLogs([
		"AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
	]);

	return (
		<UserProvider>
			<ReportProvider>
				<Navigation />
			</ReportProvider>
		</UserProvider>
	);
}
