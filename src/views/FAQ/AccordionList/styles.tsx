import { StyleSheet } from "react-native";

import { colors, fonts } from "~/util/styles";

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 50,
    justifyContent: "center"
  },

  active: {
    backgroundColor: colors.primary
  },

  inactive: {
    backgroundColor: colors.secondary
  },

  header: {
    color: colors.pureWhite,
    fontFamily: fonts.body
  },

  iconContainer: {
    position: "absolute",
    right: 10
  },

  icon: {
    color: colors.pureWhite,
    fontSize: 12
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },

  content: {
    fontFamily: fonts.body
  }
});

export default styles;
