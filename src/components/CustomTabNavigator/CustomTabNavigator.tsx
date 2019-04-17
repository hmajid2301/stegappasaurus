import { createMaterialTopTabNavigator } from "react-navigation";

import { colors, fonts } from "~/common/styles";
import Decoding from "~/views/Home/Decoding";
import Encoding from "~/views/Home/Encoding";

const commonTabOptions = (primaryColor: string) => ({
  activeTintColor: colors.pureWhite,
  inactiveTintColor: "#DDD",
  indicatorStyle: {
    backgroundColor: colors.pureWhite
  },
  labelStyle: {
    fontFamily: fonts.bodyNormal,
    fontSize: 12
  },
  pressColor: colors.pureWhite,
  style: {
    backgroundColor: primaryColor
  }
});

const CustomTabNavigator = createMaterialTopTabNavigator(
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

export default CustomTabNavigator;
