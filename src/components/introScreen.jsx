import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../assets/style/colors";

const IntroScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("SignUpScreen"); // Adjust this to your login route name
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/image5.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomSection}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            padding: 10,
            gap: 15,
          }}
        >
          <Text style={styles.title}>Smart Park</Text>
          <Text style={styles.subtitle}>
            Discover and book parking spaces easily with just a few taps.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started for Free</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    flex: 1.5,
    borderBottomEndRadius: 70,
    borderBottomStartRadius: 70,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    flex: 3,
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGrey,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
