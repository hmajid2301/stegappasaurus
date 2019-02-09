import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '~/util/styles';


const pageWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
  },

  buttonsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 2,
  },

  photoContainer: {
    marginRight: 2,
  },

  button: {
    backgroundColor: colors.primary,
    flex: 1,
    height: pageWidth / 3,
    justifyContent: 'center',
    marginLeft: 2,
    marginTop: 2,
  },

  icon: {
    color: colors.pureWhite,
    fontSize: 50,
    textAlign: 'center',
  },

  photoButton: {
    flex: 1,
  },

  photos: {
    height: pageWidth / 3,
    marginLeft: 2,
    marginTop: 2,
  },

});

export default styles;
