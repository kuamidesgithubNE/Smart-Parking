import React, { useState, useEffect, useRef } from "react";
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
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker, Callout } from "react-native-maps";
import { Picker } from "@react-native-picker/picker"; // For payment method selection
import styles from "../../assets/style/styles";
import parkingSpaces from "../../assets/data.json";

const BookingScreen = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [duration, setDuration] = useState("1 hour");
  const mapRef = useRef(null);

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

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const handleBooking = () => {
    if (!name || !selectedParking) {
      Alert.alert(
        "Error",
        "Please fill all fields and select a parking space."
      );
      return;
    }

    Alert.alert(
      "Booking Confirmed",
      `Booking confirmed for ${name} on ${date.toLocaleDateString()} at ${time.toLocaleTimeString()} for ${duration} using ${paymentMethod} at ${
        selectedParking.title
      }`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.bookingContainer}>
      <Text style={styles.bookingTitle}>Booking Details</Text>

      <TextInput
        style={styles.bookingInput}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar" size={25} color="#fff" />
        <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Ionicons name="time" size={25} color="#fff" />
        <Text style={styles.datePickerText}>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Payment Method:</Text>
        <Picker
          selectedValue={paymentMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        >
          <Picker.Item label="Credit Card" value="Credit Card" />
          <Picker.Item label="PayPal" value="PayPal" />
          <Picker.Item label="Google Pay" value="Google Pay" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Hold Space For:</Text>
        <Picker
          selectedValue={duration}
          style={styles.picker}
          onValueChange={(itemValue) => setDuration(itemValue)}
        >
          <Picker.Item label="1 hour" value="1 hour" />
          <Picker.Item label="2 hours" value="2 hours" />
          <Picker.Item label="3 hours" value="3 hours" />
          <Picker.Item label="4 hours" value="4 hours" />
        </Picker>
      </View>

      <View style={styles.bookingMapContainer}>
        <MapView
          ref={mapRef}
          style={styles.bookingMap}
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
          {parkingSpaces.map((space) => (
            <Marker
              key={space.id}
              coordinate={space.coordinates}
              title={space.title}
              description={space.price}
              onPress={() => setSelectedParking(space)}
            >
              <Callout>
                <View>
                  <Text>{space.title}</Text>
                  <Text>{space.location}</Text>
                  <Text>{space.price}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleBooking}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookingScreen;
