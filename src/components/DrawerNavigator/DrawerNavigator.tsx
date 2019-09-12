import React from "react";
import { View } from "react-native";
// @ts-ignore
import { DrawerItems, DrawerItemsProps } from "react-navigation-drawer";

import Logo from "~/components/Logo";
import { colors } from "~/modules";
import { ITheme } from "~/modules/types";
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
          iconContainerStyle={styles.icons}
          inactiveTintColor={theme.color}
          labelStyle={styles.text}
          {...props}
        />
      </View>
    );
  }
  return <View />;
};

export default DrawerNavigator;
