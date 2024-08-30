import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("Main");
      } else {
        navigation.navigate("LoginScreen");
      }
    };
    checkAuth();
  }, []);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
