import {
  createStackNavigator,
  NavigationRoute,
  NavigationScreenProp
} from "react-navigation";

import DecodeImage from "./Decoding/DecodeImage";
import Main from "./Decoding/Main";

const DecodeNavigator = createStackNavigator({
  Main: {
    navigationOptions: {
      header: null
    },
    screen: Main
  },

  DecodeImage: {
    navigationOptions: {
      header: null,
      tabBarVisible: false
    },
    screen: DecodeImage
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
