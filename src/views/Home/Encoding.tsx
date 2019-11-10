import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './Encoding/Main';
import Message from './Encoding/Message';
import Progress from './Encoding/Progress';

const EncodeNavigator = createStackNavigator({
  EncodingMain: {
    navigationOptions: {
      header: null,
    },
    screen: Main,
  },

  EncodingMessage: {
    navigationOptions: {
      header: null,
    },
    screen: Message,
  },

  EncodingProgress: {
    navigationOptions: {
      header: null,
    },
    screen: Progress,
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
