import { Body, Header, Icon, Left } from "native-base";
import React from "react";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "~/common/interfaces";
import Logo from "~/components/Logo";
import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primaryColor: PrimaryColor;
  theme: ITheme;
}

const CustomHeader = ({ navigation, primaryColor, theme }: IProps) => (
  <Header
    style={[
      styles.container,
      {
        backgroundColor: theme.background as string,
        borderBottomColor: primaryColor as string
      }
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
