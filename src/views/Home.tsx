import * as React from "react";
import { View } from "react-native";
import {
  createMaterialTopTabNavigator,
  NavigationScreenProp
} from "react-navigation";
import { connect } from "react-redux";

import { ITheme, PrimaryColor } from "@types";
import AppHeader from "~/components/AppHeader";
import { colors, fonts } from "~/modules";
import { IReducerState } from "~/redux/reducers/TogglePrimaryColor";
import Decoding from "~/views/Home/Decoding";
import Encoding from "~/views/Home/Encoding";

import styles from "./Home/styles";

const commonTabOptions = (primaryColor: string) => ({
  activeTintColor: colors.pureWhite,
  inactiveTintColor: "#DDD",
  indicatorStyle: {
    backgroundColor: colors.pureWhite
  },
  labelStyle: {
    fontFamily: fonts.body,
    fontSize: 12
  },
  pressColor: colors.pureWhite,
  style: {
    backgroundColor: primaryColor
  }
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    Decoding: {
      navigationOptions: {
        tabBarLabel: "Decoding",
        tabBarOptions: commonTabOptions(colors.secondary)
      },
      screen: Decoding
    },
    Encoding: {
      navigationOptions: {
        tabBarLabel: "Encoding",
        tabBarOptions: commonTabOptions(colors.primary)
      },
      screen: Encoding
    }
  },
  {
    initialRouteName: "Encoding",
    order: ["Encoding", "Decoding"],
    tabBarPosition: "bottom"
  }
);

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  primaryColor: PrimaryColor;
}

export class Home extends React.Component<IProps, {}> {
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
