import myColors from "../Common/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: myColors.pureWhite,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: myColors.royalBlue,
  },
});

export default styles;