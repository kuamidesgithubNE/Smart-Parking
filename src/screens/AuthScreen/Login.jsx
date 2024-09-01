import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../assets/style/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    const apiUrl =
      "http://192.168.49.109/SmartPark-Backend/Users/authentication/login.php";

    try {
      const postData = JSON.stringify({
        email: email,
        password: password,
      });

      console.log("Sending data:", postData); // Debugging line

      const response = await axios.post(apiUrl, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);

      if (response.data.success) {
        // Save the token to AsyncStorage
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

        Alert.alert("Success", "Login successful!");
        navigation.replace("Main", { user: response.data.user });
      } else {
        Alert.alert(
          "Error Message",
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Smart Park</Text>
          <Text style={styles.subtitle}>A smarter way to park</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={colors.darkGrey}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={colors.darkGrey}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}

          {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={20} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign up with Apple</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.darkGrey,
    marginTop: 5,
    fontStyle: "italic",
    fontWeight: "500",
  },
  formContainer: {
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGrey,
  },
  icon: {
    marginRight: 10,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
  },
  separatorContainer: {
    width: "94%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightGrey,
    borderBottomWidth: 1,
    borderBlockColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.darkGrey,
    fontWeight: "500",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: "100%",
    justifyContent: "center",
  },
  socialIcon: {
    marginRight: 10,
    color: colors.darkGrey,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkGrey,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  signupContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
});
