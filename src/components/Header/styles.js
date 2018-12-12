import { StyleSheet } from 'react-native';
import { colors } from '../../common';


const styles = themeColor => StyleSheet.create({
  icons: {
    color: colors.iconBlack,
  },
  outerHeaderContainer: {
    backgroundColor: colors.pureWhite,
    borderBottomWidth: 2,
    borderBottomColor: themeColor,
  },
  innerHeaderContainer: {
    transform: [{ translateY: 10 }],
  },
});

export default styles;
