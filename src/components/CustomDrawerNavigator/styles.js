import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../util/styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  icons: {
    width: 30,
  },
  text: {
    fontFamily: fonts.body_xl,
    fontWeight: 'normal',
  },
});

export default styles;
