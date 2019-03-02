import { Body, List, ListItem } from "native-base";
import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { resetPreferences } from "~/redux/actions";
import { ITheme } from "~/util/interfaces";
import styles from "./styles";

interface IProps {
  theme: ITheme;
  resetPreferences: () => void;
}

class Other extends Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <List>
        <ListItem itemHeader style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>Other</Text>
        </ListItem>

        <ListItem noIndent>
          <Body>
            <TouchableOpacity onPress={() => this.props.resetPreferences}>
              <Text style={[styles.itemText, { color: theme.color }]}>
                Reset Preferences
              </Text>
            </TouchableOpacity>
          </Body>
        </ListItem>
      </List>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPreferences: () => dispatch(resetPreferences({}))
});

export default connect(
  null,
  mapDispatchToProps
)(Other);
