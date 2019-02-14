import React, { Component } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import CustomHeader from "~/components/CustomHeader";

import CustomTabNavigator from "./Home/CustomTabNavigator";
import styles from "./Home/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: {
      background: string;
      color: string;
      isDark: boolean;
    };
  };
  primaryColor: string;
}

class Home extends Component<IProps, {}> {
  public static router = CustomTabNavigator.router;

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <CustomHeader
          primaryColor={this.props.primaryColor}
          navigation={this.props.navigation}
          theme={theme}
        />
        <CustomTabNavigator
          navigation={this.props.navigation}
          screenProps={{ theme }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  primaryColor: state.TogglePrimaryColor.colorData.color
});

export default connect(
  mapStateToProps,
  null
)(Home);
