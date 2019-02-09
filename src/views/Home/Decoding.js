import { createStackNavigator } from 'react-navigation';

import Main from './Decoding/Main';
import DecodeImage from './Decoding/DecodeImage';


const DecodeNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    },
  },

  DecodeImage: {
    screen: DecodeImage,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
});

DecodeNavigator.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  swipeEnabled: navigation.state.index === 0,
});

export default DecodeNavigator;
