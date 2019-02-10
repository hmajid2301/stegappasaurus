import { Body, Header, Icon, Left } from "native-base";
import React from "react";
import { NavigationScreenProp } from "react-navigation";

import Logo from "~/components/Logo";
import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primaryColor: string;
  theme: {
    isDark: boolean;
    background: string;
    color: string;
  };
}

const CustomHeader = ({ navigation, primaryColor, theme }: IProps) => (
  <Header
    style={[
      styles.container,
      { borderBottomColor: primaryColor, backgroundColor: theme.background }
    ]}
  >
    <Left>
      <Icon
        style={{ color: theme.color }}
        name="menu"
        onPress={() => navigation.openDrawer()}
        type="SimpleLineIcons"
      />
    </Left>
    <Body>
      <Logo color={theme.color} isDark={theme.isDark} />
    </Body>
  </Header>
);

export default CustomHeader;
