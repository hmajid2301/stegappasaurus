import React from "react";
import { View } from "react-native";
import { DrawerItems, DrawerItemsProps } from "react-navigation";

import Logo from "~/components/Logo";
import { ITheme } from "~/util/interfaces";
import { colors } from "~/util/styles";

import styles from "./styles";

const CustomDrawerNavigator: React.FunctionComponent<
  DrawerItemsProps
> = props => {
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
          drawerPosition={props.drawerPosition}
          getLabel={props.getLabel}
          iconContainerStyle={styles.icons}
          inactiveTintColor={theme.color}
          items={props.items}
          labelStyle={styles.text}
          onItemPress={props.onItemPress}
          navigation={props.navigation}
          renderIcon={props.renderIcon}
          {...props}
        />
      </View>
    );
  }
  return <View />;
};

export default CustomDrawerNavigator;
