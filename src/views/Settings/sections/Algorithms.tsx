import * as React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";

import { ITheme } from "@types";

import styles from "./styles";

interface IProps {
  theme: ITheme;
}

export default class Algorithms extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Algorithms</Text>}
        />
      </View>
    );
  }
}
