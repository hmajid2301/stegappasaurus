import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Settings from './screens/Settings';
import About from './screens/About';
import FAQ from './screens/FAQ';
import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import HomeTabNavigator from './components/CustomTabNavigator';
import { colors } from './common';


const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeTabNavigator,
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

const App = createAppContainer(MainNavigator);

export default App;
