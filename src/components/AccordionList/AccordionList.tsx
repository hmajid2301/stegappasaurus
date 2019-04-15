import { Accordion, Icon } from "native-base";
import React, { Component } from "react";
import { Text, View } from "react-native";

import { ITheme } from "~/common/interfaces";
import styles from "./styles";

interface IProps {
  faq: IFAQ[];
  theme: ITheme;
}

export interface IFAQ {
  content: string;
  title: string;
}

export default class AccordionList extends Component<IProps, {}> {
  public render() {
    return (
      <Accordion
        dataArray={this.props.faq}
        renderContent={this.renderContent}
        renderHeader={this.renderHeader}
      />
    );
  }

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

  private renderContent = (item: IFAQ) => (
    <View style={styles.contentContainer}>
      <Text style={[styles.content, { color: this.props.theme.color }]}>
        {item.content}
      </Text>
    </View>
  );
}
