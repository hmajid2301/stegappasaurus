import { StyleSheet } from 'react-native';

import { colors, fonts } from '~/util/styles';


const styles = StyleSheet.create({
  picker: {
    height: 30,
    width: 150,
  },

  checkbox: {
    paddingRight: 20,
  },

  itemHeader: {
    paddingBottom: 5,
    paddingTop: 20,
  },

  itemHeaderText: {
    color: colors.primary,
    fontFamily: fonts.body_xl,
    fontSize: 12,
  },

  itemText: {
    fontFamily: fonts.body,
  },

  itemTextUnder: {
    color: 'grey',
  },
});

export default styles;
