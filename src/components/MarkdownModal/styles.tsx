import {StyleSheet} from 'react-native';

import {bodyLight} from '~/constants/fonts';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export const markdown = {
  heading1: {
    fontFamily: bodyLight,
    fontSize: 24,
    paddingBottom: 15,
  },

  heading2: {
    fontFamily: bodyLight,
    fontSize: 18,
    paddingBottom: 10,
  },

  text: {
    fontFamily: bodyLight,
  },

  list: {
    paddingBottom: 10,
  },

  paragraph: {
    paddingBottom: 10,
  },
};

export default styles;
