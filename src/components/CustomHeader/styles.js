import { StyleSheet } from 'react-native';
import colors from '../Common/colors';


const styles = StyleSheet.create({
  icons: {
    color: colors.iconBlack,
  },
  outerHeaderContainer: {
    backgroundColor: colors.pureWhite,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryColor,
  },
  innerHeaderContainer: {
    transform: [{ translateY: 5 }],
  },
});

export default styles;
