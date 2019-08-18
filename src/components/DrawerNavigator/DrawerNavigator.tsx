import React from "react";
import { View } from "react-native";
import { DrawerItems, DrawerItemsProps } from "react-navigation";

import { ITheme } from "@types";
import Logo from "~/components/Logo";
import { colors } from "~/modules";
import styles from "./styles";

const DrawerNavigator: React.FunctionComponent<DrawerItemsProps> = props => {
  if (props.screenProps !== undefined) {
    const theme: ITheme = props.screenProps.theme;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <Logo color={theme.color} isDark={theme.isDark} />
        </View>
        <DrawerItems
          activeBackgroundColor={colors.primary}
          activeTintColor={colors.pureWhite}
          {...props}
        />
      </View>
    );
  }
  return <View />;
};

export default DrawerNavigator;
