import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { Icon } from "react-native-elements";

import { ITheme } from "@types";
import styles from "./styles";

interface IProps {
  items: IFAQ[];
  theme: ITheme;
}

interface IState {
  activeSections: number[];
  collapsed: boolean;
}

export interface IFAQ {
  content: string;
  title: string;
}

export default class FAQList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true
    };
  }

  public render() {
    return (
      <Accordion
        activeSections={this.state.activeSections}
        duration={200}
        onChange={this.setSections}
        renderContent={this.renderContent}
        renderHeader={this.renderHeader}
        sections={this.props.items}
        touchableComponent={TouchableOpacity}
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

  private renderHeader = (item: IFAQ, _: any, isActive: boolean) => (
    <View
      style={[
        styles.headerContainer,
        isActive ? styles.inactive : styles.active,
        { borderBottomColor: this.props.theme.background }
      ]}
    >
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.iconContainer}>
        {isActive ? (
          <Icon iconStyle={styles.icon} type="font-awesome" name="chevron-up" />
        ) : (
          <Icon
            iconStyle={styles.icon}
            type="font-awesome"
            name="chevron-down"
          />
        )}
      </View>
    </View>
  );

  private setSections = (sections: number[]) => {
    this.setState({
      activeSections: sections
    });
  };
}
