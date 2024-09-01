import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Card from "../components/Card";
import styles from "../../assets/style/styles";
import colors from "../../assets/style/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  // Fetch parking spaces data from the PHP API
  useEffect(() => {
    const fetchParkingSpaces = async () => {
      try {
        const response = await axios.get(
          "http://192.168.49.109/SmartPark-Backend/Others/parking_spaces.php"
        );
        setParkingSpaces(response.data);
      } catch (error) {
        console.error("Error fetching parking spaces:", error);
      }
    };

    fetchParkingSpaces();
  }, []);

  // Requesting permission to access user location
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message:
                "We need access to your location to show you nearby parking spots.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert(
              "Permission Denied",
              "Location permission is required to show nearby parking spots."
            );
          }
        } else {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    };

    // Getting the user location and coordinates
    const getCurrentLocation = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        setCurrentLocation({ latitude, longitude });
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });

        // Get the address of the current location
        const [address] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const fullAddress = `${address.street}, ${address.city}, ${address.region}, ${address.country}`;
        setCurrentAddress(fullAddress);

        // Save the current address to AsyncStorage
        saveLocation(fullAddress);
      } catch (error) {
        console.log(`Error getting location: ${error.message}`);
        Alert.alert("Error", "Failed to get current location.");
      }
    };

    requestLocationPermission();
  }, []);

  // Save the user's location in AsyncStorage
  const saveLocation = async (address) => {
    try {
      await AsyncStorage.setItem("userAddress", JSON.stringify(address));
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  // Handle card press to center map on marker and show callout
  const handleCardPressed = (id, coordinates) => {
    setSelectedCoordinates(coordinates);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...coordinates,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
    if (markerRefs.current[id]) {
      markerRefs.current[id].showCallout();
    }
  };

  console.log(currentLocation);

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <Card
      image={{ uri: `data:image/jpeg;base64,${item.image}` }} // Use image from API
      title={item.title}
      location={item.location}
      price={`$${item.price}`}
      distance={`${calculateDistance(
        currentLocation?.latitude || 0,
        currentLocation?.longitude || 0,
        parseFloat(item.latitude),
        parseFloat(item.longitude)
      )} km`}
      onPress={() =>
        handleCardPressed(item.id, {
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        })
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 6.5901051,
          longitude: 0.4674691,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Your Location"
            description={currentAddress} // Display the address in the marker's callout
            pinColor="blue"
          />
        )}
        {parkingSpaces.map((item) => (
          <Marker
            ref={(ref) => (markerRefs.current[item.id] = ref)}
            key={item.id}
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
            title={item.title}
          >
            <Callout>
              <View>
                <Text>{item.title}</Text>
                <Text>{item.location}</Text>
                <Text>{item.price}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <TextInput style={styles.input} placeholder="Enter location" />
              <TouchableOpacity>
                <Ionicons name="search" size={25} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.cardListContainer}>
          <FlatList
            data={parkingSpaces}
            keyExtractor={(item) => item.space_id.toString()}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2);
};

export default MapScreen;
