import { StyleSheet } from "react-native";

import { fonts } from "~/common/styles";

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
    fontFamily: fonts.bodyThin,
    paddingHorizontal: 20
  }
});

export default styles;
