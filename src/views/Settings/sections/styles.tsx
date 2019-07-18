import { StyleSheet } from "react-native";

import { colors, fonts } from "~/constants";

const styles = StyleSheet.create({
  itemHeader: {
    paddingBottom: 5,
    paddingTop: 20
  },

  itemHeaderText: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: 12
  },

  itemText: {
    fontFamily: fonts.bodyLight
  },

  itemTextUnder: {
    color: "grey"
  },

  checkbox: {
    paddingRight: 20
  }
});

export default styles;
