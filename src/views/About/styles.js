import { StyleSheet } from 'react-native';

import { fonts } from '~/util/styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  textContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  logo: {
    height: 50,
    width: 50,
  },

  about: {
    fontFamily: fonts.body,
    paddingHorizontal: 20,
  },
});

export default styles;
