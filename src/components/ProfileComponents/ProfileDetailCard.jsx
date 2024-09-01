import { View, Text } from "react-native";
import styles from "../../../assets/style/styles";


const DetailCard = ({email, phone}) => {
  return (
    <View style={styles.detailCard}>
      <View style={styles.detailCardContent}>
        <Text style={styles.detailCardTitle}>Email:</Text>
        <Text style={styles.detailCardValue}>{email}</Text>
      </View>
      <View style={styles.detailCardContent}>
        <Text style={styles.detailCardTitle}>Date of birth:</Text>
        <Text style={styles.detailCardValue}>20.02.2001</Text>
      </View>
      <View style={styles.detailCardContentLast}>
        <Text style={styles.detailCardTitle}>Number:</Text>
        <Text style={styles.detailCardValue}>{phone}</Text>
      </View>
    </View>
  );
};

export default DetailCard;
