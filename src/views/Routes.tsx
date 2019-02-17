import { Icon } from "native-base";
import React from "react";
import { createAppContainer, createDrawerNavigator } from "react-navigation";

import CustomDrawerNavigator from "~/components/CustomDrawerNavigator";

import About from "./About";
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
          <Icon name="home" type="FontAwesome" style={{ color: tintColor }} />
        ),
        drawerLabel: "Home"
      },
      screen: Home
    },

    About: {
      navigationOptions: {
        drawerIcon: ({ tintColor }: IColor) => (
          <Icon name="info" type="Feather" style={{ color: tintColor }} />
        ),
        drawerLabel: "About Us"
      },
      screen: About
    },

    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }: IColor) => (
          <Icon name="settings" type="Feather" style={{ color: tintColor }} />
        ),
        drawerLabel: "Settings"
      },
      screen: Settings
    },

    FAQ: {
      navigationOptions: {
        drawerIcon: ({ tintColor }: IColor) => (
          <Icon
            name="questioncircleo"
            type="AntDesign"
            style={{ color: tintColor }}
          />
        ),
        drawerLabel: "FAQ"
      },
      screen: FAQ
    }
  },
  {
    contentComponent: CustomDrawerNavigator
  }
);

const App = createAppContainer(MainNavigator);
export default App;
