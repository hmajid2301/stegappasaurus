import * as React from "react";
import { ScrollView, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "@types";
import AppHeader from "~/components/AppHeader";
import FAQList from "~/components/FAQList";
import { colors } from "~/modules";

import { questions } from "~/data";
import styles from "./FAQ/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class FAQ extends React.Component<IProps, {}> {
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

          <View style={styles.faqListContainer}>
            <FAQList
              backgroundColor={theme.background}
              color={theme.color}
              items={questions}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
