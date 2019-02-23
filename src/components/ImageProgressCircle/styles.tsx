import { Dimensions, StyleSheet } from "react-native";

import { fonts } from "~/util/styles";

const pageWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  encodeImageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },

  circularImage: {
    borderRadius: pageWidth * 0.666
  },

  encodingImage: {
    height: pageWidth * 0.666,
    width: pageWidth * 0.666
  },

  textPercentageContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },

  textPercentage: {
    color: "black",
    fontFamily: fonts.body_xl,
    fontSize: 50
  }
});

export default styles;
