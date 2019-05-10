import { StyleSheet } from "react-native";

import { fonts } from "~/constants";

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  text: {
    fontFamily: fonts.header,
    fontSize: 20
  },

  logo: {
    height: 25,
    width: 25
  }
});

export default styles;
