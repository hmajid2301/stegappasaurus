import { List } from "native-base";
import React, { Component } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "~/common/interfaces";
import { colors } from "~/common/styles";
import CustomHeader from "~/components/CustomHeader";

import { About, Algorithms, Other, Support, Themes } from "./Settings/sections";
import styles from "./Settings/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class Settings extends Component<IProps, {}> {
  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <CustomHeader
          primaryColor={colors.primary as PrimaryColor}
          navigation={this.props.navigation}
          theme={theme}
        />
        <List>
          <Algorithms theme={theme} />
          <Themes theme={theme} />
          <Support />
          <Other theme={theme} />
          <About theme={theme} />
        </List>
      </View>
    );
  }
}
