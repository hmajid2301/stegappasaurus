import { Body, List, ListItem, Picker, Right } from "native-base";
import React, { Component } from "react";
import { Text } from "react-native";

import { AlgorithmNames, ITheme } from "~/common/interfaces";
import { withDispatchAlgorithm } from "~/redux/hoc";
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
              <Picker.Item label="F5" value="F5" />
              <Picker.Item label="LSB PNG" value="LSB-PNG" />
              <Picker.Item label="LSB DCT" value="LSB-DCT" />
            </Picker>
          </Right>
        </ListItem>
      </List>
    );
  }
}

export default withDispatchAlgorithm(Algorithms);
