import { Icon } from "native-base";
import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import CustomHeader from "~/components/CustomHeader";
import { colors } from "~/util/styles";
import AboutList from "~/views/About/AboutList";
import icons from "~/views/About/icons";
import styles from "~/views/About/styles";

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

interface IColor {
  tintColor: string;
}

export default class About extends Component<IProps, {}> {
  public static navigationOptions = {
    drawerIcon: ({ tintColor }: IColor) => (
      <Icon name="info" type="Feather" style={{ color: tintColor }} />
    ),
    drawerLabel: "About Us"
  };

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView>
          <CustomHeader
            primaryColor={colors.primary}
            navigation={this.props.navigation}
            theme={theme}
          />

          <View style={styles.textContainer}>
            <Text style={[styles.about, { color: theme.color }]}>
              This project involves implementing steganography algorithms. It
              allows users to hide messages within image files, using these
              algorithms. It was originally developed using the Ionic/Apache
              Cordova framework.{"\n\n"}
              This app is a rewrite of my third year dissertation project. This
              new app is written using Expo/React Native. There are numerous
              improvements that were made during the rewrite. For example the
              new app has a much better UI/UX and has some new features such as
              sharing the encoded images.
            </Text>
          </View>

          <View>
            <AboutList icons={icons} color={theme.color} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
