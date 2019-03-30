import { Dimensions, StyleSheet } from "react-native";

const pageWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  encodeImageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },

  circularImage: {
    borderRadius: pageWidth * 0.75,
    borderWidth: 5,
    overflow: "hidden"
  },

  encodingImage: {
    height: pageWidth * 0.75,
    opacity: 0.65,
    width: pageWidth * 0.75
  }
});

export default styles;
