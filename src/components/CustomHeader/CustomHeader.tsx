import * as React from "react";
import { Header, Icon } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "@types";
import Logo from "~/components/Logo";
import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primaryColor: PrimaryColor;
  theme: ITheme;
}

const CustomHeader = ({ navigation, primaryColor, theme }: IProps) => (
  <Header
    leftComponent={
      <Icon
        color={theme.color}
        name="menu"
        onPress={() => {
          navigation.openDrawer();
        }}
        type="simple-line-icon"
      />
    }
    centerComponent={<Logo color={theme.color} isDark={theme.isDark} />}
    containerStyle={[
      styles.container,
      {
        backgroundColor: theme.background as string,
        borderBottomColor: primaryColor as string
      }
    ]}
  />
);

export default CustomHeader;
