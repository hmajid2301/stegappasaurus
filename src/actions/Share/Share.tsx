import {
  createAppContainer,
  NavigationRoute,
  NavigationScreenProp,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from '~/views/Home/Decoding/Main';
import Message from '~/views/Home/Decoding/Message';
import Progress from '~/views/Home/Decoding/Progress';

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
});

DecodeNavigator.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationRoute>;
}) => ({
  swipeEnabled: navigation.state.index === 0,
  tabBarVisible: navigation.state.index === 0,
});

const AppContainer = createAppContainer(DecodeNavigator);
export default AppContainer;
