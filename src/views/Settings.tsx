import * as React from "react";
import { ScrollView, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme } from "@types";
import AppHeader from "~/components/AppHeader";

import { About, Support, Themes } from "./Settings/sections";
import styles from "./Settings/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class Settings extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props.screenProps;

    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <AppHeader navigation={this.props.navigation} theme={theme} />
        <View>
          <Themes theme={theme} />
          <Support background={theme.background} color={theme.color} />
          <About background={theme.background} color={theme.color} />
        </View>
      </ScrollView>
    );
  }
}
