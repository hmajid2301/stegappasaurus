import { Body, CheckBox, List, ListItem, Right } from "native-base";
import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { toggleDarkTheme } from "~/redux/actions";
import { colors } from "~/util/styles";

import styles from "./styles";

interface IProps {
  algorithm: string;
  toggleDarkTheme: (isDark: boolean) => void;
  theme: {
    background: string;
    color: string;
    isDark: boolean;
  };
}

class Themes extends Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <List>
        <ListItem itemHeader style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>Themes</Text>
        </ListItem>

        <ListItem noIndent>
          <Body>
            <Text style={[styles.itemText, { color: theme.color }]}>
              Dark Mode
            </Text>
          </Body>
          <Right style={styles.checkbox}>
            <CheckBox
              checked={theme.isDark}
              color={colors.primary}
              onPress={() => this.props.toggleDarkTheme(theme.isDark)}
            />
          </Right>
        </ListItem>
      </List>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDarkTheme: (algorithm: boolean) => dispatch(toggleDarkTheme(algorithm))
});

export default connect(
  null,
  mapDispatchToProps
)(Themes);
