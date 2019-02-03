import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import CustomDrawerNavigator from '~/components/CustomDrawerNavigator';

import About from './About';
import FAQ from './FAQ';
import Home from './Home';
import Settings from './Settings';


const MainNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
  },

  About: {
    screen: About,
  },

  Settings: {
    screen: Settings,
  },

  FAQ: {
    screen: FAQ,
  },
}, {
  contentComponent: CustomDrawerNavigator,
});

const App = createAppContainer(MainNavigator);
export default App;
