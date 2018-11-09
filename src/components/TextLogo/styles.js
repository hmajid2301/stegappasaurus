import { StyleSheet } from 'react-native';
import myColors from '../Common/colors';


const styles = StyleSheet.create({
  icons: {
    color: myColors.iconBlack,
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
    transform: [{ translateY: 3 }],
  },
  logo: {
    height: 50,
    width: 50,
  },
});

export default styles;
