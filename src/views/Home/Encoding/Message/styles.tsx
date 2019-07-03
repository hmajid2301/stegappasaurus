import { Dimensions, StyleSheet } from "react-native";

import { colors, fonts } from "~/constants";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "white",
    height: SCREEN_HEIGHT * 0.55,
    justifyContent: "center",
    marginHorizontal: SCREEN_WIDTH * 0.025,
    marginVertical: SCREEN_HEIGHT * 0.25,
    paddingHorizontal: 20,
    paddingVertical: 20
  },

  modalHeader: {
    fontFamily: fonts.header,
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center"
  },

  sliderContainer: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
    marginBottom: 20
  },

  modalText: {
    fontFamily: fonts.bodyLight
  },

  passwordContainer: {
    flex: 1
  },

  passwordTextInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },

  buttonContainer: {
    flex: 1,
    marginTop: 20
  }
});

export default styles;
