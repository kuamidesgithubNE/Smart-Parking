import { View, Text } from "react-native";
import styles from "../../../assets/style/styles";


const DetailCard = () => {
  return (
    <View style={styles.detailCard}>
      <View style={styles.detailCardContent}>
        <Text style={styles.detailCardTitle}>Email:</Text>
        <Text style={styles.detailCardValue}>jeradbenson@gmail.com</Text>
      </View>
      <View style={styles.detailCardContent}>
        <Text style={styles.detailCardTitle}>Date of birth:</Text>
        <Text style={styles.detailCardValue}>20.02.2001</Text>
      </View>
      <View style={styles.detailCardContentLast}>
        <Text style={styles.detailCardTitle}>Number:</Text>
        <Text style={styles.detailCardValue}>+233 54 345 2334</Text>
      </View>
    </View>
  );
};

export default DetailCard;
