// OnboardingScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";


const OnboardingScreen = ({ navigation }) => {
  return (
    <Swiper style={styles.wrapper} loop={false}>
      <View style={styles.slide}>
        <Image
          source={require("../../assets/images/map.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Find Nearby Parking</Text>
        <Text style={styles.text}>
          Easily locate available parking spots near your destination.
        </Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../../assets/images/location.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Book in Advance</Text>
        <Text style={styles.text}>
          Reserve your parking spot ahead of time and avoid the hassle.
        </Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../../assets/images/payment1.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Secure Payment</Text>
        <Text style={styles.text}>
          Pay securely through the app and enjoy a hassle-free parking
          experience.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("IntroScreen")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.slide}>
        <IntroScreen/>
      </View> */}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 350,
    height: 400,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 15,
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default OnboardingScreen;
