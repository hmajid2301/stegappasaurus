import { createMaterialTopTabNavigator } from 'react-navigation';

import { colors } from '../../common';
import Encoding from '../../screens/Encoding';
import Decoding from '../../screens/Decoding';


const commonTabOptions = color => ({
  activeTintColor: 'white',
  pressColor: colors.pureWhite,
  inactiveTintColor: '#ddd',
  labelStyle: {
    fontFamily: 'RobotoRegular',
    fontSize: 12,
  },
  indicatorStyle: {
    backgroundColor: colors.pureWhite,
  },
  style: {
    backgroundColor: color,
  },
});

const CustomerTabNavigator = createMaterialTopTabNavigator({
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

export default CustomerTabNavigator;
