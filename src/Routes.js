import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import Settings from './screens/Settings';
import About from './screens/About';
import FAQ from './screens/FAQ';
import Home from './screens/Home';


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
