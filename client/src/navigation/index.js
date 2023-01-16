import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Auth from "../screens/Auth";

export default function Navigation() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Auth"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="HomeTab" component={HomeTab} />
				<Stack.Screen name="Auth" component={Auth} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function HomeTab() {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Map") {
						iconName = focused ? "map" : "map-outline";
					} else if (route.name === "Profile") {
						iconName = focused ? "people" : "people-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "#3B82F6",
				tabBarInactiveTintColor: "white",
				tabBarActiveBackgroundColor: "#fff",
				tabBarInactiveBackgroundColor: "#3B82F6",
				headerShown: false,
				tabBarShowLabel: true,
			})}
			initialRouteName="Home"
		>
			<Tab.Screen name="Map" component={Profile} />
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}
