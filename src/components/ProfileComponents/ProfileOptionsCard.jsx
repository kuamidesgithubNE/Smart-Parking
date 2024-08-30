import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../../assets/style/styles";

const OptionsCard = () => {
  return (
    <View style={styles.optionCard}>
      <TouchableOpacity style={styles.optionCardContent}>
        <View style={styles.optionCardContentTitle}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            style={styles.optionCardContentTitleIcon}
          />
          <Text style={styles.optionCardContentTitleText}>Change Password</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCardContent}>
        <View style={styles.optionCardContentTitle}>
          <Ionicons
            name="cog-outline"
            size={25}
            style={styles.optionCardContentTitleIcon}
          />
          <Text style={styles.optionCardContentTitleText}>Settings</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCardContent}>
        <View style={styles.optionCardContentTitle}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            style={styles.optionCardContentTitleIcon}
          />
          <Text style={styles.optionCardContentTitleText}>Help</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

export default OptionsCard;
