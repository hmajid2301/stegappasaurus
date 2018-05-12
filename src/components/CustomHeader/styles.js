import { StyleSheet } from 'react-native';
import myColors from '../Common/styles';

const styles = StyleSheet.create({
  icons: {
    color: myColors.iconBlack,
  },
  outerHeaderContainer: {
    backgroundColor: myColors.pureWhite,
    borderBottomWidth: 2,
    borderBottomColor: myColors.royalBlue,
  },
  innerHeaderContainer: {
    transform: [{ translateY: 5 }],
  },
});

export default styles;