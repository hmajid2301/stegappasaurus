import React, { Component } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import CustomHeader from "~/components/CustomHeader";
import CustomTabNavigator from "~/components/CustomTabNavigator";
import { IReducerState } from "~/redux/reducers/TogglePrimaryColor";
import { ITheme, PrimaryColor } from "~/util/interfaces";

import styles from "./Home/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
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
          primaryColor={this.props.primaryColor as PrimaryColor}
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

const mapStateToProps = (state: IReducerState) => ({
  primaryColor: state.colorData.color
});

export default connect(
  mapStateToProps,
  null
)(Home);
