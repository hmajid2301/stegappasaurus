
import { StyleSheet } from 'react-native';
import myColors from '../Common/styles';

const styles = StyleSheet.create({
  icons: {
    color: myColors.iconBlack,
  },
  centerComponent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    transform: [{ translateY: 0 }],
  },
  logoContainer: {
    transform: [{ translateY: 3 }],
  },
  headerText: {
    fontFamily: 'roboto-thin',
    fontSize: 20,
  },
  logo: {
    height: 50,
    width: 50,
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
