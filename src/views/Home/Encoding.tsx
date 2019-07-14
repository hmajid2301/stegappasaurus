import {
  createStackNavigator,
  NavigationRoute,
  NavigationScreenProp
} from "react-navigation";

import Main from "./Encoding/Main";
import Message from "./Encoding/Message";
import Progress from "./Encoding/Progress";

const EncodeNavigator = createStackNavigator({
  Main: {
    navigationOptions: {
      header: null
    },
    screen: Main
  },

  EncodingMessage: {
    navigationOptions: {
      header: null,
      tabBarVisible: false
    },
    screen: Message
  },

  EncodingProgress: {
    navigationOptions: {
      header: null,
      tabBarVisible: false
    },
    screen: Progress
  }
});

EncodeNavigator.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<NavigationRoute>;
}) => ({
  swipeEnabled: navigation.state.index === 0,
  tabBarVisible: navigation.state.index === 0
});

export default EncodeNavigator;
