import { createMaterialTopTabNavigator } from 'react-navigation';

import colors from '../Common/colors';
import Encoding from '../../screens/Encoding';
import Decoding from '../../screens/Decoding';


const commonTabOptions = color => ({
  activeTintColor: 'white',
  pressColor: colors.pureWhite,
  inactiveTintColor: '#ddd',
  labelStyle: {
    fontFamily: 'OpenSansRegular',
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
      tabBarOptions: commonTabOptions(colors.primaryColor),
    },
  },
  Decoding: {
    screen: Decoding,
    navigationOptions: {
      tabBarLabel: 'Decoding',
      tabBarOptions: commonTabOptions(colors.secondaryColor),
    },
  },
}, {
  tabBarPosition: 'bottom',
});

export default CustomerTabNavigator;
