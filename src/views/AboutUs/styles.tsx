import { StyleSheet } from "react-native";

import { fonts } from "~/modules";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },

  textContainer: {
    alignItems: "center",
    paddingVertical: 20
  },

  about: {
    fontFamily: fonts.bodyLight,
    paddingHorizontal: 20
  }
});

export default styles;
