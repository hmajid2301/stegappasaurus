import React from "react";
import { View } from "react-native";
import { DrawerItems } from "react-navigation";

import Logo from "~/components/Logo";
import { colors } from "~/util/styles";
import styles from "./styles";

interface IProps {
  screenProps: {
    theme: {
      isDark: boolean;
      background: string;
      color: string;
    };
  };
}

const CustomDrawerNavigator: React.FunctionComponent<IProps> = props => {
  const { theme } = props.screenProps;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Logo color={theme.color} isDark={theme.isDark} />
      </View>
      <DrawerItems
        activeBackgroundColor={colors.primary}
        activeTintColor={colors.pureWhite}
        iconContainerStyle={styles.icons}
        labelStyle={styles.text}
        inactiveTintColor={theme.color}
        {...props}
      />
    </View>
  );
};

export default CustomDrawerNavigator;
