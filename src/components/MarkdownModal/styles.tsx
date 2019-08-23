import { StyleSheet } from "react-native";

import { fonts } from "~/modules";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },

  icons: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  buttonText: {
    fontFamily: fonts.bodyLight
  }
});

export const markdown = {
  heading1: {
    fontFamily: fonts.bodyLight,
    fontSize: 24,
    paddingBottom: 15
  },

  heading2: {
    fontFamily: fonts.bodyLight,
    fontSize: 18,
    paddingBottom: 10
  },

  text: {
    fontFamily: fonts.bodyLight
  },

  list: {
    paddingBottom: 10
  },

  paragraph: {
    paddingBottom: 10
  }
};

export default styles;
