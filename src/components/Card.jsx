import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "../../assets/style/styles";
const Card = ({ image, title, location, price, distance, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/images/parking6.jpg")}
          style={styles.cardImage}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{location}</Text>
        <View style={styles.PSOthers}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.distance}>{distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
