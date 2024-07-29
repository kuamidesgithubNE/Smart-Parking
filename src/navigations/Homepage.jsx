import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../assets/style/styles";
import colors from "../../assets/style/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Card from "../components/Card";
import parkingData from "../../assets/data.json";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    // Filter the data to include only 'NearBy Space' categories
    const filteredData = parkingData.filter(
      (item) => item.category === "NearBy Space"
    );
    setFilterData(filteredData);

    // For all the data
    setData(parkingData);
  }, []);

  const renderItem = ({ item }) => (
    <Card
      image={item.cardImage}
      title={item.title}
      location={item.location}
      price={item.price}
      distance={item.distance}
    />
  );

  return (
    <ScrollView style={styles.homepage}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../../assets/images/image5.jpg")}
          style={styles.background}
        >
          <View style={styles.content}>
            <Text style={styles.text}>Hi, Jerrad</Text>
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
          <Text style={styles.categoryTitle}>NearBy Space</Text>
          <TouchableOpacity>
            <Text style={styles.categoryLink}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filterData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />
      </View>

      <View>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Recent Space</Text>
          <TouchableOpacity>
            <Text style={styles.categoryLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />
      </View>

      <View>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Available Space</Text>
          <TouchableOpacity>
            <Text style={styles.categoryLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
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
