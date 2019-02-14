import { MailComposer } from "expo";
import { List } from "native-base";
import React, { Component } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import CustomHeader from "~/components/CustomHeader";
import { colors } from "~/util/styles";

import { About, Algorithms, Support, Themes } from "./Settings/sections";
import styles from "./Settings/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: {
      background: string;
      color: string;
      isDark: boolean;
    };
  };
}

export default class Settings extends Component<IProps, {}> {
  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <CustomHeader
          primaryColor={colors.primary}
          navigation={this.props.navigation}
          theme={theme}
        />
        <List>
          <Algorithms theme={theme} />
          <Themes theme={theme} />
          <Support theme={theme} />
          <About theme={theme} />
        </List>
      </View>
    );
  }

  private sendEmail = async () => {
    await MailComposer.composeAsync({
      recipients: ["me@haseebmajid.com"],
      subject: "Stegappasaurus"
    });
  };
}
