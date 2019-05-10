import { Dimensions, StyleSheet } from "react-native";

import { colors } from "~/constants";

const pageHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },

  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    height: pageHeight / 4,
    justifyContent: "center",
    margin: 5,
    width: pageHeight / 4
  },

  icon: {
    color: colors.pureWhite,
    fontSize: 75,
    textAlign: "center"
  }
});

export default styles;
