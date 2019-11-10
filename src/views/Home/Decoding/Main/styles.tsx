import {Dimensions, StyleSheet} from 'react-native';

import {pureWhite, secondary} from '~/constants/colors';

const pageWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 2,
    marginTop: 2,
  },

  button: {
    backgroundColor: secondary,
    flex: 1,
    height: pageWidth / 3,
    justifyContent: 'center',
    marginLeft: 2,
    marginTop: 2,
  },

  icon: {
    color: pureWhite,
    fontSize: 40,
    textAlign: 'center',
  },

  photoListContainer: {
    flex: 1,
    marginRight: 2,
  },
});

export default styles;
