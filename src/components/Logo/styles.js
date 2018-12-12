import { StyleSheet } from 'react-native';
import { colors } from '../../common';


const styles = StyleSheet.create({
  icons: {
    color: colors.iconBlack,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    transform: [{ translateY: 0 }],
  },
  text: {
    fontFamily: 'RobotoThin',
    fontSize: 20,
  },
  logoContainer: {
    transform: [{ translateY: -5 }],
  },
  logo: {
    height: 25,
    width: 25,
  },
});

export default styles;
