import { createDrawerNavigator } from 'react-navigation';

import Home from './screens/Home';
import Settings from './screens/Settings';
import AboutUs from './screens/AboutUs';
import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import colors from './components/Common/colors';


const MyApp = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
  AboutUs: {
    screen: AboutUs,
  },
}, {
  initialRoute: 'Encoding',
  contentComponent: CustomDrawerNavigator,
  contentOptions: {
    activeTintColor: colors.pureWhite,
    activeBackgroundColor: colors.primaryColor,
  },
});

export default MyApp;
