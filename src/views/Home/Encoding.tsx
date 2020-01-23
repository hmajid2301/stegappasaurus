import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Settings from '~/views/Settings';
import Main from './Encoding/Main';
import Message from './Encoding/Message';
import Progress from './Encoding/Progress';

const EncodeNavigator = createStackNavigator({
  Main: {
    navigationOptions: {
      header: null,
    },
    screen: Main,
  },

  Message: {
    navigationOptions: {
      header: null,
    },
    screen: Message,
  },

  Progress: {
    navigationOptions: {
      header: null,
    },
    screen: Progress,
  },

  Settings: {
    navigationOptions: {
      header: null,
    },
    screen: Settings,
  },
});

EncodeNavigator.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationRoute>;
}) => ({
  swipeEnabled: navigation.state.index === 0,
  tabBarVisible: navigation.state.index === 0,
});

export default EncodeNavigator;
