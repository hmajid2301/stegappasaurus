import { StyleSheet } from "react-native";

import { colors, fonts } from "~/common/styles";

const styles = StyleSheet.create({
  buttonText: { color: colors.primary },
  snackbar: { backgroundColor: "#323232", borderRadius: 3, margin: 5 },
  text: { fontSize: 14, fontFamily: fonts.bodyLight, paddingHorizontal: 10 }
});

export default styles;
