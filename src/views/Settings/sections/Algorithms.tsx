import { Body, List, ListItem, Picker, Right } from "native-base";
import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AlgorithmNames, ITheme } from "@types";
import { selectAlgorithm } from "~/redux/actions";
import { IReducerState } from "~/redux/reducers/SelectAlgorithm";

import styles from "./styles";

interface IProps {
  algorithm: AlgorithmNames;
  selectAlgorithm: (value: AlgorithmNames) => void;
  theme: ITheme;
}

class Algorithms extends Component<IProps, {}> {
  public render() {
    const { algorithm, theme } = this.props;

    return (
      <List>
        <ListItem itemHeader style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>Algorithms</Text>
        </ListItem>

        <ListItem noIndent>
          <Body>
            <Text style={[styles.itemText, { color: theme.color }]}>
              Encoding Algorithm
            </Text>
          </Body>
          <Right>
            <Picker
              mode="dropdown"
              note
              onValueChange={value => this.props.selectAlgorithm(value)}
              selectedValue={algorithm}
              style={styles.picker}
            >
              <Picker.Item label="LSB" value="LSB" />
            </Picker>
          </Right>
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = (state: IReducerState) => ({
  algorithm: state.SelectAlgorithm.algorithm
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectAlgorithm: (algorithm: AlgorithmNames) =>
    dispatch(selectAlgorithm({ algorithm }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Algorithms);
