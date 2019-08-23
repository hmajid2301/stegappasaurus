import { StyleSheet } from "react-native";

import { colors, fonts } from "~/modules";

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },

  content: {
    fontFamily: fonts.bodyLight
  },

  headerContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 50,
    justifyContent: "center"
  },

  inactive: {
    backgroundColor: colors.secondary
  },

  active: {
    backgroundColor: colors.primary
  },

  header: {
    color: colors.pureWhite,
    fontFamily: fonts.bodyLight
  },

  iconContainer: {
    position: "absolute",
    right: 10
  },

  icon: {
    color: colors.pureWhite,
    fontSize: 12
  }
});

export default styles;
