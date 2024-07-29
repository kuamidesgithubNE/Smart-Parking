import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../assets/style/colors";

// Importing the screens here
import HomeScreen from "./Homepage";
import BookingsScreen from "./Booking";
import MapScreen from "./Map";
import ProfileScreen from "./Profile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getHeaderOptions = (title) => ({
  headerTitle: title,
  headerTitleAlign: "center",
  headerTintColor: colors.primary, // Header text color
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 25, // Adjust the font size here
    paddingHorizontal: 10, // Add horizontal padding if needed
  },
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 15, padding: 5 }}>
      <Ionicons name="menu" size={25} color="black" />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity style={{ marginRight: 15, padding: 5 }}>
      <Ionicons name="notifications" size={25} color="black" />
    </TouchableOpacity>
  ),
});

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={getHeaderOptions("Smart Parking")}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function BookingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingMain"
        component={BookingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapMain"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BottomNavigationBar() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Bookings") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return (
              <Ionicons name={iconName} size={size} color={colors.primary} />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookings"
          component={BookingStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Map"
          component={MapStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavigationBar"
        component={BottomNavigationBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
