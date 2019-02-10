import {
  createStackNavigator,
  NavigationRoute,
  NavigationScreenProp
} from "react-navigation";

import EncodeImage from "./Encoding/EncodeImage";
import Main from "./Encoding/Main";

const EncodeNavigator = createStackNavigator({
  Main: {
    navigationOptions: {
      header: null
    },
    screen: Main
  },

  EncodeImage: {
    navigationOptions: {
      header: null,
      tabBarVisible: false
    },
    screen: EncodeImage
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
