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
import Geolocation from "react-native-geolocation-service";
import Ionicons from "react-native-vector-icons/Ionicons";
import Card from "../components/Card"; // Ensure the path is correct
import styles from "../../assets/style/styles";
import colors from "../../assets/style/colors"; // Ensure the path is correct
import data from "../../assets/data.json"; // Ensure the path and format of the data are correct

const MapScreen = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "We need access to your location to show you nearby parking spots",
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
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        },
        (error) => {
          console.log(error);
          Alert.alert("Error", "Failed to get current location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    };

    requestLocationPermission();
  }, []);

  const handleCardPressed = (id, coordinates) => {
    setSelectedCoordinates(coordinates);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...coordinates,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        1000
      );
    }
    if (markerRefs.current[id]) {
      markerRefs.current[id].showCallout();
    }
  };

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
            pinColor="blue"
          />
        )}
        {data.map((item) => (
          <Marker
            ref={(ref) => (markerRefs.current[item.id] = ref)}
            key={item.id}
            coordinate={item.coordinates}
            title={item.title}
            description={item.price}
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
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                location={item.location}
                price={item.price}
                distance={item.distance}
                onPress={() => handleCardPressed(item.id, item.coordinates)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
