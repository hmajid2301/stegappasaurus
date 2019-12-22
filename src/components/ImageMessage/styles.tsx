import {StyleSheet} from 'react-native';

import {bodyLight} from '~/constants/fonts';

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },

  textInputContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  message: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffffff',
    fontFamily: bodyLight,
    fontSize: 22,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
  },
});

export default styles;
