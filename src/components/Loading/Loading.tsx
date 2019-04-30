import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";

import { colors } from "~/common/styles";

import styles from "./styles";

interface IProps {
  hide: boolean;
}

export default class Loading extends Component<IProps, {}> {
  public render() {
    if (this.props.hide) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      );
    }
    return <View />;
  }
}
