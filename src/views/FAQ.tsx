import { Content } from "native-base";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import CustomHeader from "~/components/CustomHeader";
import { colors } from "~/util/styles";
import AccordionList from "~/views/FAQ/AccordionList";

import faq from "./FAQ/questions";
import styles from "./FAQ/styles";

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

export default class FAQ extends Component<IProps, {}> {
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

          <View style={styles.accordionContainer}>
            <Content padder>
              <AccordionList faq={faq} theme={theme} />
            </Content>
          </View>
        </ScrollView>
      </View>
    );
  }
}
