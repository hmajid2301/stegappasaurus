import * as React from "react";
import { Picker, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
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

class Algorithms extends React.Component<IProps, {}> {
  public render() {
    const { algorithm, theme } = this.props;

    return (
      <View>
        <ListItem
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Algorithms</Text>}
        />

        <ListItem
          title={
            <View>
              <Text style={[styles.itemText, { color: theme.color }]}>
                Encoding Algorithm
              </Text>
            </View>
          }
          rightTitle={
            <Picker
              onValueChange={value => this.props.selectAlgorithm(value)}
              selectedValue={algorithm}
              style={styles.picker}
            >
              <Picker.Item label="LSB" value="LSB" />
              <Picker.Item label="DCT" value="DCT" />
            </Picker>
          }
          topDivider={true}
          bottomDivider={true}
        />
      </View>
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
