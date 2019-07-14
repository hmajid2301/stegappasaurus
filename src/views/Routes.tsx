import * as React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer, createDrawerNavigator } from "react-navigation";

import DrawerNavigator from "~/components/DrawerNavigator";

import AboutUs from "./AboutUs";
import FAQ from "./FAQ";
import Home from "./Home";
import Settings from "./Settings";

interface IColor {
  tintColor: string;
}

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerIcon: ({ tintColor }: IColor) => (
          <Icon name="home" type="font-awesome" color={tintColor} />
        ),
        drawerLabel: "Home"
      },
      screen: Home
    },

    About: {
      navigationOptions: {
        drawerIcon: ({ tintColor }: IColor) => (
          <Icon name="info" type="feather" color={tintColor} />
        ),
        drawerLabel: "About Us"
      },
      screen: AboutUs
    },

    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }: IColor) => (
          <Icon name="settings" type="feather" color={tintColor} />
        ),
        drawerLabel: "Settings"
      },
      screen: Settings
    },

    FAQ: {
      navigationOptions: {
        drawerIcon: ({ tintColor }: IColor) => (
          <Icon name="questioncircleo" type="antdesign" color={tintColor} />
        ),
        drawerLabel: "FAQ"
      },
      screen: FAQ
    }
  },
  {
    contentComponent: DrawerNavigator
  }
);

const App = createAppContainer(MainNavigator);
export default App;
