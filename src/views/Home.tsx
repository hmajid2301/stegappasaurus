import * as React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import { ITheme, PrimaryColor } from "@types";
import AppHeader from "~/components/AppHeader";
import TabNavigator from "~/components/TabNavigator";
import { IReducerState } from "~/redux/reducers/TogglePrimaryColor";

import styles from "./Home/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  primaryColor: PrimaryColor;
}

class Home extends React.Component<IProps, {}> {
  public static router = TabNavigator.router;

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <AppHeader
          primaryColor={this.props.primaryColor}
          navigation={this.props.navigation}
          theme={theme}
        />
        <TabNavigator
          navigation={this.props.navigation}
          screenProps={{ theme }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerState) => ({
  primaryColor: state.TogglePrimaryColor.colorData.color
});

export default connect(
  mapStateToProps,
  null
)(Home);
