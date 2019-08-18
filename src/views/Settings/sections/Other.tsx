import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ThemeColors } from "@types";
import { resetPreferences } from "~/redux/actions";
import styles from "./styles";

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
  resetPreferences: () => void;
}

export class Other extends React.Component<IProps, {}> {
  public render() {
    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: this.props.background
          }}
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Other</Text>}
        />

        <ListItem
          containerStyle={{
            backgroundColor: this.props.background
          }}
          title={
            <View>
              <TouchableOpacity onPress={() => this.props.resetPreferences}>
                <Text style={[styles.itemText, { color: this.props.color }]}>
                  Reset Preferences
                </Text>
              </TouchableOpacity>
            </View>
          }
          topDivider={true}
          bottomDivider={true}
        />
      </View>
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
