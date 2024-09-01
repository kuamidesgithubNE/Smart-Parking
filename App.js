import React, { useState } from "react";
import AppNavigator from "./src/navigations/routes";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content" // Set text color for the status bar
        backgroundColor="lightgrey" // Background color of the status bar
      />
      <AppNavigator />
    </NavigationContainer>
  );
}
