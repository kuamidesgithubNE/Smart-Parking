import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../../assets/style/colors";

export default function AuthLoadingScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // Delay navigation by 5 seconds
        setTimeout(() => {
          navigation.navigate("Main");
        }, 2000); // 2000 ms = 2 seconds
      } else {
        // Delay navigation by 5 seconds
        setTimeout(() => {
          navigation.navigate("LoginScreen");
        }, 5000);
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartPark</Text>
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      <Text style={styles.loadingText}>Loading...</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 SmartPark</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary, // Assuming primary color is your background color
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
    // Additional styles to make the loader look thicker, e.g., larger size or custom loader can be applied here
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#fff",
  },
});
