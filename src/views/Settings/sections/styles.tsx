import { StyleSheet } from "react-native";

import { colors, fonts } from "~/common/styles";

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

  picker: {
    height: 30,
    width: 150
  },

  checkbox: {
    paddingRight: 20
  }
});

export default styles;
