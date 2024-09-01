import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../../assets/style/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../assets/style/colors";
import DetailCard from "../components/ProfileComponents/ProfileDetailCard";
import OptionsCard from "../components/ProfileComponents/ProfileOptionsCard";
import ImageUploadModal from "../components/ProfileComponents/UploadModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // const handleImagePicked = (uri) => {
  //   setProfileImage(uri);
  // };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access your gallery is required!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      closeModal();
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera is required!"
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      closeModal();
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigation.navigate("LoginScreen");
      }
    };
    fetchUserData();
  }, []);

  // Logged user details
  const username = user?.username;
  const email = user?.email;
  const phone = user?.phone;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileContainer}>
        <View>
          <View style={styles.profilePicContainer}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/images/image5.jpg")
              }
              style={styles.profilePic}
            />
            <TouchableOpacity
              style={styles.addProfileButton}
              onPress={openModal}
            >
              <Ionicons
                name="camera-outline"
                size={25}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.location}>
              <Ionicons name="location" size={20} color={"#333"} />
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 15,
                  color: colors.darkGrey,
                }}
              >
                Ho, Ghana
              </Text>
            </View>
          </View>
        </View>

        {/* for the user Info cards */}

        <View style={{ width: "92%" }}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Personal Info</Text>
            <TouchableOpacity>
              <Text style={styles.categoryLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          <DetailCard email={email} phone={phone} />
        </View>

        {/* for the option cards */}

        <View style={{ width: "92%" }}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Options</Text>
          </View>

          <OptionsCard />
        </View>
      </View>

      <ImageUploadModal
        takePhoto={takePhoto}
        onClose={closeModal}
        pickImageFromGallery={pickImageFromGallery}
        visible={isModalVisible}
      />
    </ScrollView>
  );
};

export default ProfileScreen;
