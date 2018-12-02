import { StyleSheet } from 'react-native';
import { colors } from '../../common';


const styles = color => StyleSheet.create({
  header: {
    backgroundColor: colors.pureWhite,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: color,
  },
});

export default styles;
