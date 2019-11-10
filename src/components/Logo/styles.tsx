import {StyleSheet} from 'react-native';

import {header} from '~/constants/fonts';

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  text: {
    fontFamily: header,
    fontSize: 20,
  },

  logo: {
    height: 25,
    width: 25,
  },
});

export default styles;
