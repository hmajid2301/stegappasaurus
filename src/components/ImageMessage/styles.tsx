import { StyleSheet } from "react-native";

import { colors, fonts } from "~/modules";

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: "100%",
    width: "100%"
  },

  textInputContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },

  message: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "#ffffff",
    fontFamily: fonts.bodyLight,
    fontSize: 22,
    paddingHorizontal: 20,
    paddingVertical: 20
  }
});

export default styles;
