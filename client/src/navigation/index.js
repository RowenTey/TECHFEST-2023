import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Profile from "../screens/Profile";

export default function Navigation() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="BottomBar"
				// screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="BottomBar" component={BottomBar} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function BottomBar() {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarActiveTintColor: "orange",
				tabBarInactiveTintColor: "gray",
				tabBarActiveBackgroundColor: "#ffffff",
				tabBarInactiveBackgroundColor: "#000000",
				headerShown: false,
				tabBarShowLabel: true,
				tabBarHideOnKeyboard: true,
			})}
			initialRouteName={Home}
		>
			<Tab.Screen name="Map" component={Home} />
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}
