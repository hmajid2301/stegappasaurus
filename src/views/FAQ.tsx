import { Content } from "native-base";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "~/common/interfaces";
import { colors } from "~/common/styles";
import CustomHeader from "~/components/CustomHeader";
import FAQList from "~/components/FAQList";

import faq from "./FAQ/questions";
import styles from "./FAQ/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class FAQ extends Component<IProps, {}> {
  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView>
          <CustomHeader
            primaryColor={colors.primary as PrimaryColor}
            navigation={this.props.navigation}
            theme={theme}
          />

          <View style={styles.faqListContainer}>
            <Content padder>
              <FAQList items={faq} theme={theme} />
            </Content>
          </View>
        </ScrollView>
      </View>
    );
  }
}
