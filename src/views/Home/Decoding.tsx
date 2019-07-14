import {
  createStackNavigator,
  NavigationRoute,
  NavigationScreenProp
} from "react-navigation";

import Main from "./Decoding/Main";
import Message from "./Decoding/Message";
import Progress from "./Decoding/Progress";

const DecodeNavigator = createStackNavigator({
  Main: {
    navigationOptions: {
      header: null
    },
    screen: Main
  },

  DecodingMessage: {
    navigationOptions: {
      header: null,
      tabBarVisible: false
    },
    screen: Message
  },

  DecodingProgress: {
    navigationOptions: {
      header: null,
      tabBarVisible: false
    },
    screen: Progress
  }
});

DecodeNavigator.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<NavigationRoute>;
}) => ({
  swipeEnabled: navigation.state.index === 0,
  tabBarVisible: navigation.state.index === 0
});

export default DecodeNavigator;
