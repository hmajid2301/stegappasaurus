import * as React from "react";
import { StatusBar, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { NavigationScreenProp, NavigationState } from "react-navigation";

import { ITheme } from "@types";
import Logo from "~/components/Logo";
import { colors } from "~/modules";
import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  theme: ITheme;
}

const AppHeader = ({ navigation, theme }: IProps) => (
  <View>
    <StatusBar
      backgroundColor={theme.background}
      hidden={false}
      barStyle={theme.isDark ? "light-content" : "dark-content"}
    />
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
          borderBottomColor: showPrimaryColor(navigation)
            ? colors.primary
            : colors.secondary
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
  </View>
);

const showPrimaryColor = (navigation: NavigationScreenProp<any, any>) => {
  const activeRoute = getActiveRouteState(navigation.state) as any;
  const routeName = activeRoute.routeName;
  let showPrimary = true;

  if (routeName.startsWith("Decoding")) {
    showPrimary = false;
  }

  return showPrimary;
};

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

  if (routeName.startsWith("Encoding")) {
    navigation.navigate("EncodingMain");
  } else if (routeName.startsWith("Decoding")) {
    navigation.navigate("DecodingMain");
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
