import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },

  // the top container
  topContainer: {
    padding: 16,
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 150,
    marginBottom: 16,
  },

  // Homepage Styling
  homepage: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    width: "98%",
    height: 140,
    marginHorizontal: "auto",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    padding: 15,
  },
  imageoverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: "rgba(0,0,0,0.6)", // Adjust the opacity as needed
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 7,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
  blog: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: "500",
  },

  // Filter
  filterBox: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.darkGrey,
    color: "#fff",
    borderRadius: 15,
  },
  filterItems: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  // The category side
  categoryHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 7,
  },
  categoryTitle: {
    fontWeight: "800",
    fontSize: 18,
    color: colors.darkGrey,
  },
  categoryLink: {
    color: colors.accent,
  },

  // Map page styling
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.primary,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  searchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 5,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    width: "100%",
  },
  searchText: {
    fontSize: 18,
    marginBottom: 8,
    color: colors.primary,
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 40,
    borderColor: colors.primary,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    padding: 8,
  },

  // For the map of the page
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    width: "100%",
    marginBottom: 16,
  },

  accentText: {
    color: colors.accent,
  },

  // For the ProfileScreens
  profileContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
    gap: 60,
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderColor: colors.accent, // Adding border with accent color
    borderWidth: 2,
  },
  profilePicContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  addProfileButton: {
    position: "absolute",
    bottom: -4,
    right: -5,
    borderRadius: 30,
    padding: 10,
  },
  addIcon: {
    width: 42,
    padding: 9,
    backgroundColor: colors.primary,
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: colors.secondary,
    fontWeight: "900",
  },
  detailCard: {
    width: "90%",
    backgroundColor: colors.secondary,
    borderRadius: 25,
    padding: 15,
    shadowColor: "#999",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },

  detailCardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBlockColor: "#E8E8E8",
  },
  detailCardContentLast: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingBottom: 15,
  },
  detailCardTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  detailCardValue: {
    color: "#888",
    fontSize: 16,
  },

  optionCard: {
    width: "90%",
    backgroundColor: colors.secondary,
    borderRadius: 25,
    padding: 15,
    shadowColor: "#999",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  optionCardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingBottom: 15,
  },
  optionCardContentTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  optionCardContentTitleText: {
    fontSize: 16,
    fontWeight: "500",
  },
  optionCardContentTitleIcon: {
    padding: 10,
    backgroundColor: "#9999",
    borderRadius: 10,
    color: colors.secondary,
  },

  // Booking Screen Styles

  bookingContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.primary, // Use primary color for title
  },
  bookingInput: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  datePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#999",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  bookingMapContainer: {
    height: 200,
    marginBottom: 20,
  },
  bookingMap: {
    ...StyleSheet.absoluteFillObject,
  },
  submitButton: {
    backgroundColor: colors.primary, // Use accent color for button background
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // the smaller cards
  card: {
    width: 180,
    height: 190,
    padding: 3,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: "60%",
    borderRadius: 5,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginTop: 7,
    marginLeft: 7,
  },

  detail: {
    fontSize: 14,
    color: "#999",
    marginLeft: 7,
  },
  PSOthers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
    marginHorizontal: 7,
  },
  price: {
    fontWeight: "500",
    color: colors.black,
    fontSize: 16,
  },
  distance: {
    fontWeight: "700",
    color: colors.primary,
    fontSize: 16,
  },
  cardListContainer: {
    marginTop: "130%",
  },
  cardList: {
    paddingBottom: 16,
  },
});

export default styles;
