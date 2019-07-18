import * as React from "react";
import { Header, Icon } from "react-native-elements";
import { NavigationScreenProp, NavigationState } from "react-navigation";

import { ITheme, PrimaryColor } from "@types";
import Logo from "~/components/Logo";
import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primaryColor: PrimaryColor;
  theme: ITheme;
}

const AppHeader = ({ navigation, primaryColor, theme }: IProps) => (
  <Header
    leftComponent={
      <Icon
        color={theme.color}
        name="menu"
        onPress={() => {
          navigation.openDrawer();
        }}
        type="simple-line-icon"
      />
    }
    centerComponent={<Logo color={theme.color} isDark={theme.isDark} />}
    containerStyle={[
      styles.container,
      {
        backgroundColor: theme.background as string,
        borderBottomColor: primaryColor as string
      }
    ]}
    rightComponent={
      <Icon
        color={showHomeIcon(navigation) ? theme.color : theme.background}
        name="home"
        type="antdesign"
        onPress={() => goToHome(navigation)}
      />
    }
  />
);

const showHomeIcon = (navigation: NavigationScreenProp<any, any>) => {
  const activeRoute = getActiveRouteState(navigation.state) as any;
  const routeName = activeRoute.routeName;
  let showHome = false;

  if (routeName.startsWith("Encoding") || routeName.startsWith("Decoding")) {
    showHome = true;
  }

  return showHome;
};

const goToHome = (navigation: NavigationScreenProp<any, any>) => {
  const activeRoute = getActiveRouteState(navigation.state) as any;
  const routeName = activeRoute.routeName;

  if (routeName.startsWith("Encoding") || routeName.startsWith("Decoding")) {
    navigation.navigate("Main");
  }
};

const getActiveRouteState = (route: NavigationState): NavigationState => {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index] as NavigationState;
  return getActiveRouteState(childActiveRoute);
};

export default AppHeader;
