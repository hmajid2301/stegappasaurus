import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import Settings from './screens/Settings';
import About from './screens/About';
import FAQ from './screens/FAQ';
import Home from './screens/Home';
import { colors } from './util/styles';


const MainNavigator = createDrawerNavigator({
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

const App = createAppContainer(MainNavigator);
export default App;
