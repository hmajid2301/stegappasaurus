import * as React from "react";
import { StatusBar, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { NavigationScreenProp, NavigationState } from "react-navigation";

import Logo from "~/components/Logo";
import { colors } from "~/modules";
import { ITheme } from "~/modules/types";
import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  theme: ITheme;
}

export default class AppHeader extends React.Component<IProps, {}> {
  public render() {
    const { navigation, theme } = this.props;
    return (
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
              onPress={navigation.openDrawer()}
              type="simple-line-icon"
            />
          }
          centerComponent={<Logo color={theme.color} isDark={theme.isDark} />}
          containerStyle={[
            styles.container,
            {
              backgroundColor: theme.background as string,
              borderBottomColor: this.showPrimaryColor.bind(this, navigation)
                ? colors.primary
                : colors.secondary
            }
          ]}
          rightComponent={
            <Icon
              color={
                this.showHomeIcon.bind(this, navigation)
                  ? theme.color
                  : theme.background
              }
              name="home"
              type="antdesign"
              onPress={this.goToHome.bind(this, navigation)}
            />
          }
        />
      </View>
    );
  }

  private showPrimaryColor(navigation: NavigationScreenProp<any, any>) {
    const activeRoute = this.getActiveRouteState(navigation.state) as any;
    const routeName = activeRoute.routeName;
    let showPrimary = true;

    if (routeName.startsWith("Decoding")) {
      showPrimary = false;
    }

    return showPrimary;
  }

  private showHomeIcon(navigation: NavigationScreenProp<any, any>) {
    const activeRoute = this.getActiveRouteState(navigation.state) as any;
    const routeName = activeRoute.routeName;
    let showHome = false;

    if (routeName.startsWith("Encoding") || routeName.startsWith("Decoding")) {
      showHome = true;
    }

    return showHome;
  }

  private goToHome(navigation: NavigationScreenProp<any, any>) {
    const activeRoute = this.getActiveRouteState(navigation.state) as any;
    const routeName = activeRoute.routeName;

    if (routeName.startsWith("Encoding")) {
      navigation.navigate("EncodingMain");
    } else if (routeName.startsWith("Decoding")) {
      navigation.navigate("DecodingMain");
    }
  }

  private getActiveRouteState(route: NavigationState): NavigationState {
    if (
      !route.routes ||
      route.routes.length === 0 ||
      route.index >= route.routes.length
    ) {
      return route;
    }

    const childActiveRoute = route.routes[route.index] as NavigationState;
    return this.getActiveRouteState(childActiveRoute);
  }
}
