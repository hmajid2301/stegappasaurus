import { createDrawerNavigator } from 'react-navigation';

import Home from './screens/Home';
import Settings from './screens/Settings';
import About from './screens/About';
import FAQ from './screens/FAQ';
import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import { colors } from './common';


const MyApp = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
  About: {
    screen: About,
  },
  FAQ: {
    screen: FAQ,
  },
}, {
  contentComponent: CustomDrawerNavigator,
  contentOptions: {
    activeTintColor: colors.pureWhite,
    activeBackgroundColor: colors.primary,
  },
});

export default MyApp;
