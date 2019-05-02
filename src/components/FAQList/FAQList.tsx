import { Accordion, Icon } from "native-base";
import React, { Component } from "react";
import { Text, View } from "react-native";

import { ITheme } from "@types";
import styles from "./styles";

interface IProps {
  items: IFAQ[];
  theme: ITheme;
}

export interface IFAQ {
  content: string;
  title: string;
}

export default class FAQList extends Component<IProps, {}> {
  public render() {
    return (
      <Accordion
        dataArray={this.props.items}
        renderContent={this.renderContent}
        renderHeader={this.renderHeader}
      />
    );
  }

  private renderContent = (item: IFAQ) => (
    <View style={styles.contentContainer}>
      <Text style={[styles.content, { color: this.props.theme.color }]}>
        {item.content}
      </Text>
    </View>
  );

  private renderHeader = (item: IFAQ, expanded: boolean) => (
    <View
      style={[
        styles.headerContainer,
        expanded ? styles.inactive : styles.active,
        { borderBottomColor: this.props.theme.background }
      ]}
    >
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.iconContainer}>
        {expanded ? (
          <Icon style={styles.icon} type="FontAwesome" name="chevron-up" />
        ) : (
          <Icon style={styles.icon} type="FontAwesome" name="chevron-down" />
        )}
      </View>
    </View>
  );
}
