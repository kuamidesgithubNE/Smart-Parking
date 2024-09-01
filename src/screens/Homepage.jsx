import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Card from "../components/Card";
import styles from "../../assets/style/styles";

const HomeScreen = ({ navigation }) => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkingSpaces = async () => {
      try {
        const response = await axios.get(
          "http://192.168.49.109/SmartPark-Backend/Others/parking_spaces.php"
        );
        setParkingSpaces(response.data);
        setFilterData(response.data); // Update filterData with fetched data
      } catch (error) {
        console.error("Error fetching parking spaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingSpaces();
  }, []);

  const renderItem = ({ item }) => (
    <Card
      image={{ uri: `data:image/jpeg;base64,${item.image}` }} // Use image from API
      title={item.title}
      location={item.location}
      price={`$${item.price}`}
      distance={`${calculateDistance(item.latitude, item.longitude)} km`}
      onPress={() => console.log("Card pressed")}
    />
  );

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
  }, [navigation]);

  const calculateDistance = (latitude, longitude) => {
    const userLatitude = 1.0; // Replace with actual user's latitude
    const userLongitude = 1.0; // Replace with actual user's longitude

    const distance = Math.sqrt(
      Math.pow(latitude - userLatitude, 2) +
        Math.pow(longitude - userLongitude, 2)
    );

    return distance.toFixed(2); // Returns distance in km
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.homepage}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../../assets/images/parking.jpg")}
          style={styles.background}
        >
          <View style={styles.imageoverlay} />
          <View style={styles.content}>
            <Text style={styles.text}>Hi, {user.username || "User"}</Text>
            <Text style={styles.blog}>Fresh start your parking journey</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.filterItems}>
        <TouchableOpacity style={styles.filterBox}>
          <Ionicons name="car" size={20} color="#fff" />
          <Text style={{ color: "#fff" }}>Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBox}>
          <Ionicons name="bus" size={20} color="#fff" />
          <Text style={{ color: "#fff" }}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBox}>
          <Ionicons name="bicycle" size={20} color="#fff" />
          <Text style={{ color: "#fff" }}>Bicycle</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Nearby</Text>
          <TouchableOpacity>
            <Text style={styles.categoryLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filterData}
          keyExtractor={(item) => item.space_id.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />
      </View>

      <View>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Recent</Text>
          <TouchableOpacity>
            <Text style={styles.categoryLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={parkingSpaces} // Use parkingSpaces for the "Recent" section
          keyExtractor={(item) => item.space_id.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
