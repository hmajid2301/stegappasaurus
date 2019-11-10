import {StyleSheet} from 'react-native';

import {body, header} from '~/constants/fonts';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },

  image: {
    height: 400,
    width: 400,
  },

  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: header,
    fontSize: 35,
    textAlign: 'center',
  },

  text: {
    backgroundColor: 'transparent',
    color: '#F5F0F0',
    fontFamily: body,
    paddingBottom: 50,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
});

export default styles;
