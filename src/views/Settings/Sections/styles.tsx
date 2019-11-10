import {StyleSheet} from 'react-native';

import {primary} from '~/constants/colors';
import {body, bodyLight} from '~/constants/fonts';

const styles = StyleSheet.create({
  itemHeader: {
    paddingBottom: 5,
    paddingTop: 20,
  },

  itemHeaderText: {
    color: primary,
    fontFamily: body,
    fontSize: 12,
  },

  itemText: {
    fontFamily: bodyLight,
  },

  itemTextUnder: {
    color: 'grey',
  },

  checkbox: {
    paddingRight: 20,
  },
});

export default styles;
