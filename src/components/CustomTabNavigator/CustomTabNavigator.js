import { createMaterialTopTabNavigator } from 'react-navigation';

import { toggleTheme, changeTheme } from '../../actions';
import COLORS from '../../themes';
import store from '../../store';
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
      tabBarOnPress: ({ defaultHandler }) => {
        store.dispatch(toggleTheme(COLORS.secondary));
        store.dispatch(changeTheme('Encoding'));
        defaultHandler();
      },
    },
  },
  Decoding: {
    screen: Decoding,
    navigationOptions: {
      tabBarLabel: 'Decoding',
      tabBarOptions: commonTabOptions(colors.secondaryColor),
      tabBarOnPress: ({ defaultHandler }) => {
        store.dispatch(toggleTheme(COLORS.primary));
        store.dispatch(changeTheme('Decoding'));
        defaultHandler();
      },
    },
  },
}, {
  tabBarPosition: 'bottom',
});

export default CustomerTabNavigator;
