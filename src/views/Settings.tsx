import * as React from "react";
import { ScrollView, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "@types";
import CustomHeader from "~/components/CustomHeader";
import { colors } from "~/constants";

import { About, Algorithms, Other, Support, Themes } from "./Settings/sections";
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
        <CustomHeader
          primaryColor={colors.primary as PrimaryColor}
          navigation={this.props.navigation}
          theme={theme}
        />
        <View>
          <Algorithms theme={theme} />
          <Themes theme={theme} />
          <Support />
          <Other theme={theme} />
          <About theme={theme} />
        </View>
      </ScrollView>
    );
  }
}
