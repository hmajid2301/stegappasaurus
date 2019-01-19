import { StyleSheet } from 'react-native';
import { colors } from '../../util/styles';


const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.pureWhite,
    height: 70,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
});

export default styles;
