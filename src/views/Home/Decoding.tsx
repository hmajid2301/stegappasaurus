import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Settings from '~/views/Settings';
import Main from './Decoding/Main';
import Message from './Decoding/Message';
import Progress from './Decoding/Progress';

const DecodeNavigator = createStackNavigator({
  Main: {
    navigationOptions: {
      header: null,
    },
    screen: Main,
  },

  Progress: {
    navigationOptions: {
      header: null,
    },
    screen: Progress,
  },

  Message: {
    navigationOptions: {
      header: null,
    },
    screen: Message,
  },

  Settings: {
    navigationOptions: {
      header: null,
    },
    screen: Settings,
  },
});

DecodeNavigator.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationRoute>;
}) => ({
  swipeEnabled: navigation.state.index === 0,
  tabBarVisible: navigation.state.index === 0,
});

export default DecodeNavigator;
