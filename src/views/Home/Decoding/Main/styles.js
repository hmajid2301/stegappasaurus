import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '~/util/styles';


const pageHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    height: pageHeight / 4,
    width: pageHeight / 4,
    justifyContent: 'center',
    margin: 5,
  },

  icon: {
    color: colors.pureWhite,
    fontSize: 75,
    textAlign: 'center',
  },

});

export default styles;
