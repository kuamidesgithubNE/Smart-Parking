import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../assets/style/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../assets/style/colors";

const ProfileScreen = () => {
  return (
    <View style={styles.profileContainer}>
      <View>
        <View style={styles.profilePicContainer}>
          <Image
            source={require("../../assets/images/image5.jpg")}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.addProfileButton}>
            <Ionicons name="camera-outline" size={20} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.username}>Jared Benson</Text>
          <View style={styles.location}>
            <Ionicons name="location" size={25} color={colors.accent} />
            <Text
              style={{
                fontWeight: "500",
                fontSize: 17,
                color: colors.darkGrey,
              }}
            >
              Ho, Ghana
            </Text>
          </View>
        </View>
      </View>

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

      <View style={styles.optionCard}>
        <TouchableOpacity style={styles.optionCardContent}>
          <View style={styles.optionCardContentTitle}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              style={styles.optionCardContentTitleIcon}
            />
            <Text style={styles.optionCardContentTitleText}>
              Change Password
            </Text>
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
    </View>
  );
};

export default ProfileScreen;
