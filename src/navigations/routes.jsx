import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../assets/style/colors";

// Importing the screens here
import HomeScreen from "../screens/Homepage";
import BookingsScreen from "../screens/Booking";
import MapScreen from "../screens/Map";
import ProfileScreen from "../screens/Profile";
import OnboardingScreen from "../screens/swipeScreen";
import IntroScreen from "../components/introScreen";
import LoginScreen from "../screens/AuthScreen/Login";
import SignupScreen from "../screens/AuthScreen/Register";
import AuthLoadingScreen from "../screens/AuthScreen/AuthScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getHeaderOptions = (name, location) => ({
  headerTitle: () => (
    <SafeAreaView
      style={{
        flexDirection: "row",
        alignItems: "center",
        // paddingVertical: 20,
      }}
    >
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: colors.dark }}>
          {name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: "#555",
              fontWeight: 500,
            }}
          >
            {location}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  ),
  headerTitleAlign: "left",
  headerTintColor: colors.primary,
  headerRight: () => (
    <TouchableOpacity
      style={{
        marginRight: 15,
        padding: 7,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
      }}
    >
      <Ionicons name="notifications" size={25} color={colors.primary} />
    </TouchableOpacity>
  ),
});

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={getHeaderOptions("Jared  Benson! 👋", "Ho, Volta Region")}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// function BookingStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="BookingMain"
//         component={BookingsScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// function MapStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="MapMain"
//         component={MapScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// function ProfileStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="ProfileMain"
//         component={ProfileScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

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
          component={BookingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
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
        name="AuthLoadingScreen"
        component={AuthLoadingScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Main"
        component={BottomNavigationBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
