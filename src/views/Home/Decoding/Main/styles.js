import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '~/util/styles';


const pageHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  button: {
    backgroundColor: colors.secondary,
    height: pageHeight / 2,
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
  },

  icon: {
    color: colors.pureWhite,
    fontSize: 150,
    textAlign: 'center',
  },

});

export default styles;
