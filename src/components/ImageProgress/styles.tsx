import {Dimensions, StyleSheet} from 'react-native';

import {body} from '~/constants/fonts';

const pageWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  circularImage: {
    borderRadius: pageWidth * 0.75,
    borderWidth: 5,
    overflow: 'hidden',
  },

  image: {
    height: pageWidth * 0.75,
    opacity: 0.65,
    width: pageWidth * 0.75,
  },

  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  textPercentage: {
    color: 'black',
    fontFamily: body,
    fontSize: 50,
  },
});

export default styles;
