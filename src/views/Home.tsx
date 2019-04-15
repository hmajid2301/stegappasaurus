import React, { Component } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "~/common/interfaces";
import CustomHeader from "~/components/CustomHeader";
import CustomTabNavigator from "~/components/CustomTabNavigator";
import { withPrimaryColor } from "~/redux/hoc";

import styles from "./Home/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  primaryColor: PrimaryColor;
}

class Home extends Component<IProps, {}> {
  public static router = CustomTabNavigator.router;

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <CustomHeader
          primaryColor={this.props.primaryColor}
          navigation={this.props.navigation}
          theme={theme}
        />
        <CustomTabNavigator
          navigation={this.props.navigation}
          screenProps={{ theme }}
        />
      </View>
    );
  }
}

export default withPrimaryColor(Home);
