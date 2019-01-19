import { StyleSheet } from 'react-native';
import { colors } from '../../util/styles';


const styles = themeColor => StyleSheet.create({
  icons: {
    color: colors.iconBlack,
  },
  container: {
    paddingTop: 20,
    height: 70,
    backgroundColor: colors.pureWhite,
    borderBottomWidth: 2,
    borderBottomColor: themeColor,
  },
});

export default styles;
