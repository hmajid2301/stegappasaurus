import { StyleSheet } from "react-native";

import { fonts } from "~/common/styles";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },

  icons: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "right"
  },

  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  buttonText: {
    fontFamily: fonts.bodyThin
  }
});

export const markdown = {
  heading1: {
    fontFamily: fonts.bodyThin,
    fontSize: 24,
    paddingBottom: 15
  },

  heading2: {
    fontFamily: fonts.bodyThin,
    fontSize: 18,
    paddingBottom: 10
  },

  text: {
    fontFamily: fonts.bodyThin
  },

  list: {
    paddingBottom: 10
  },

  paragraph: {
    paddingBottom: 10
  }
};

export default styles;
