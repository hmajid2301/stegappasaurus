import React from "react";
import { ScrollView, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme } from "@types";
import AboutList from "~/components/AboutList";
import AppHeader from "~/components/AppHeader";
import { about } from "~/data";
import styles from "~/views/AboutUs/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class AboutUs extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView>
          <AppHeader navigation={this.props.navigation} theme={theme} />

          <View style={styles.textContainer}>
            <Text style={[styles.about, { color: theme.color }]}>
              This project was developed by me as a way to learn React Native.
              It is a complete rewrite of the my university project, which was
              written in Ionic (Apache Cordova). This mobile application allow
              you, the user, to encode image with text using steganography
              algorithms.
            </Text>
          </View>

          <View>
            <AboutList
              items={about}
              backgroundColor={theme.background}
              color={theme.color}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
