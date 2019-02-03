import { StyleSheet } from 'react-native';

import { colors, fonts } from '~/util/styles';


const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  selectedImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
  },


  userMessage: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: colors.pureWhite,
    fontFamily: fonts.body,
    fontSize: 22,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default styles;
