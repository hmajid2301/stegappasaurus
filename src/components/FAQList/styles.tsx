import {StyleSheet} from 'react-native';

import {primary, pureWhite, secondary} from '~/constants/colors';
import {bodyLight} from '~/constants/fonts';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  content: {
    fontFamily: bodyLight,
  },

  headerContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },

  inactive: {
    backgroundColor: secondary,
  },

  active: {
    backgroundColor: primary,
  },

  header: {
    color: pureWhite,
    fontFamily: bodyLight,
  },

  iconContainer: {
    position: 'absolute',
    right: 10,
  },

  icon: {
    color: pureWhite,
    fontSize: 12,
  },
});

export default styles;
