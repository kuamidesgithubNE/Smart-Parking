import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// Create Bottom Tab and Stack Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Header options function
const getHeaderOptions = (username, location) => ({
  headerTitle: () => (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{username}</Text>
        <View style={styles.headerLocationContainer}>
          <Text style={styles.headerLocation}>{location}</Text>
        </View>
      </View>
    </SafeAreaView>
  ),
  headerTitleAlign: "left",
  headerTintColor: colors.primary,
  headerRight: () => (
    <TouchableOpacity style={styles.headerRightButton}>
      <Ionicons name="notifications" size={25} color="#fff" />
    </TouchableOpacity>
  ),
});

// HomeStack Navigator
function HomeStack() {
  const [username, setUsername] = useState("User"); // Default username or empty

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUsername(parsedData.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        ...getHeaderOptions(username, "Ho, Volta Region"),
        headerLeft: null,
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomRightRadius: 10,
        },
        headerTitleStyle: {
          color: colors.white,
        },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Bottom Navigation Bar
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

// AppNavigator Component
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleContainer: {
    paddingVertical: 10,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: "#fff",
  },
  headerLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLocation: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  headerRightButton: {
    marginRight: 15,
    padding: 7,
  },
});

export default AppNavigator;
