import { createMaterialTopTabNavigator } from 'react-navigation';

import { fonts, colors } from '~/util/styles';
import Encoding from '~/views/Home/Encoding';
import Decoding from '~/views/Home/Decoding';


const commonTabOptions = primaryColor => ({
  activeTintColor: colors.pureWhite,
  pressColor: colors.pureWhite,
  inactiveTintColor: '#DDD',
  labelStyle: {
    fontFamily: fonts.body_xl,
    fontSize: 12,
  },
  indicatorStyle: {
    backgroundColor: colors.pureWhite,
  },
  style: {
    backgroundColor: primaryColor,
  },
});

const CustomTabNavigator = createMaterialTopTabNavigator({
  Encoding: {
    screen: Encoding,
    navigationOptions: {
      tabBarLabel: 'Encoding',
      tabBarOptions: commonTabOptions(colors.primary),
    },
  },
  Decoding: {
    screen: Decoding,
    navigationOptions: {
      tabBarLabel: 'Decoding',
      tabBarOptions: commonTabOptions(colors.secondary),
    },
  },
}, {
  tabBarPosition: 'bottom',
});

export default CustomTabNavigator;
