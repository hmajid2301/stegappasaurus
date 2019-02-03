import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../util/styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: 'center',
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
    height: 70,
    justifyContent: 'center',
    paddingTop: 15,
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
