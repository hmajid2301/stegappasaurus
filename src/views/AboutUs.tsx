import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "@types";
import AboutList from "~/components/AboutList";
import AppHeader from "~/components/AppHeader";
import { colors } from "~/constants";
import AboutItems from "~/views/About/AboutItems";
import styles from "~/views/About/styles";

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
          <AppHeader
            primaryColor={colors.primary as PrimaryColor}
            navigation={this.props.navigation}
            theme={theme}
          />

          <View style={styles.textContainer}>
            <Text style={[styles.about, { color: theme.color }]}>
              This project involves implementing steganography algorithms. It
              allows users to hide messages within image files, using these
              algorithms. It was originally developed using the Ionic/Apache
              Cordova framework. This app is a rewrite of my third year
              dissertation project. This new app is written using Expo/React
              Native. There are numerous improvements that were made during the
              rewrite. For example the new app has a much better UI/UX and has
              some new features such as sharing the encoded images.
            </Text>
          </View>

          <View>
            <AboutList
              items={AboutItems}
              backgroundColor={theme.background}
              color={theme.color}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
