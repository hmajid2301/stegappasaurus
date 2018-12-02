import { StyleSheet } from 'react-native';
import colors from '../Common/colors';


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
    transform: [{ translateY: 5 }],
  },
});

export default styles;
