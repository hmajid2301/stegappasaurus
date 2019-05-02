import { Body, CheckBox, List, ListItem, Right, Switch } from "native-base";
import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme } from "@types";
import { colors } from "~/common/styles";
import { toggleAutomaticTheme, toggleDarkTheme } from "~/redux/actions";
import { IReducerState } from "~/redux/reducers/ToggleAutomaticTheme";
import styles from "./styles";

interface IProps {
  isAutomatic: boolean;
  toggleAutomaticTheme: (isAutomatic: boolean) => void;
  toggleDarkTheme: (isDark: boolean) => void;
  theme: ITheme;
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
          {this.props.isAutomatic || (
            <Right style={styles.checkbox}>
              <CheckBox
                checked={theme.isDark}
                color={colors.primary}
                onPress={() => this.props.toggleDarkTheme(theme.isDark)}
              />
            </Right>
          )}
        </ListItem>

        <ListItem noIndent>
          <Body>
            <Text style={[styles.itemText, { color: theme.color }]}>
              Automatic
            </Text>
            <Text style={[styles.itemText, styles.itemTextUnder]}>
              Automatically changes to dark mode at sunset and light mode at
              sunrise.
            </Text>
          </Body>
          <Right style={styles.checkbox}>
            <Switch
              onValueChange={value => this.props.toggleAutomaticTheme(value)}
              value={this.props.isAutomatic}
            />
          </Right>
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = (state: IReducerState) => ({
  isAutomatic: state.ToggleAutomaticTheme.isAutomatic
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleAutomaticTheme: (isAutomatic: boolean) =>
    dispatch(toggleAutomaticTheme({ isAutomatic })),
  toggleDarkTheme: (isDark: boolean) => dispatch(toggleDarkTheme({ isDark }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Themes);
