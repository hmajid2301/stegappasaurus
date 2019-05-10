import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme } from "@types";
import { resetPreferences } from "~/redux/actions";
import styles from "./styles";

interface IProps {
  theme: ITheme;
  resetPreferences: () => void;
}

class Other extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <View>
        <ListItem
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Other</Text>}
        />

        <ListItem
          title={
            <View>
              <TouchableOpacity onPress={() => this.props.resetPreferences}>
                <Text style={[styles.itemText, { color: theme.color }]}>
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
