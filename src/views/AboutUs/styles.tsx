import {StyleSheet} from 'react-native';

import {bodyLight} from '~/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  textContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  about: {
    fontFamily: bodyLight,
    paddingHorizontal: 20,
  },
});

export default styles;
