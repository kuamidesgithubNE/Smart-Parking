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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../assets/style/colors";
import axios from "axios";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  
  const handleSignup = async () => {
    const apIUrl = "http://192.168.49.109/SmartPark-Backend/Users/authentication/signup.php";
  
    try {
      const response = await axios.post(apIUrl, {
        username: username,
        email: email,
        phone: phone,
        password: password,
      });
  
      console.log("Response:", response.data);
  
      if (response.data.status === "success") {
        // Show success message
        Alert.alert("Message", response.data.message);
  
        // Navigate to the Login screen
        navigation.navigate("LoginScreen");
      } else {
        // Show error message from backend
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Smart Park</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={colors.darkGrey}
            />
          </View>

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
            <Ionicons name="call-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
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
              placeholder="Choose a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={colors.darkGrey}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
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
          <Text>{message}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
    color: colors.darkGrey,
  },
});
