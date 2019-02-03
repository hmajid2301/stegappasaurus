import { createStackNavigator } from 'react-navigation';

import EncodeImage from './Encoding/EncodeImage';
import Main from './Encoding/Main';


const EncodeNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    },
  },

  EncodeImage: {
    screen: EncodeImage,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
});

EncodeNavigator.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  swipeEnabled: navigation.state.index === 0,
});

export default EncodeNavigator;
