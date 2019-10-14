import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";

import { colors } from "~/modules";
import { ITheme } from "~/modules/types";
import { ThemeContext } from "~/providers/ThemeContext";
import styles from "./styles";

interface IProps {
  theme: ITheme;
}

export default class Themes extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Themes</Text>}
        />
        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          topDivider={true}
          bottomDivider={true}
          titleStyle={[styles.itemText, { color: theme.color }]}
          title="Dark Mode"
          checkBox={{
            checked: theme.isDark,
            checkedColor: colors.primary,
            onPress: this.setTheme.bind(this, !theme.isDark)
          }}
        />
      </View>
    );
  }

  private async setTheme(isDark: boolean) {
    const { changeTheme } = useContext(ThemeContext);
    changeTheme(isDark);
    await AsyncStorage.setItem("@Theme", JSON.stringify(isDark));
  }
}
