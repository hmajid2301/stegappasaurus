import {StyleSheet} from 'react-native';

import {bodyLight} from '~/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  iconContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  buttonText: {
    fontFamily: bodyLight,
  },
});

export default styles;
