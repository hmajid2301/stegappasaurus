import {StyleSheet} from 'react-native';

import {primary} from '~/constants/colors';
import {body} from '~/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: 'center',
    borderBottomColor: primary,
    borderBottomWidth: 2,
    height: 80,
    justifyContent: 'center',
    paddingTop: 15,
  },

  icons: {
    width: 30,
  },

  text: {
    fontFamily: body,
    fontWeight: 'normal',
  },
});

export default styles;
