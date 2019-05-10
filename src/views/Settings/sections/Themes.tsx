import * as React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme } from "@types";
import { colors } from "~/constants";
import { toggleAutomaticTheme, toggleDarkTheme } from "~/redux/actions";
import { IReducerState } from "~/redux/reducers/ToggleAutomaticTheme";
import styles from "./styles";

interface IProps {
  isAutomatic: boolean;
  toggleAutomaticTheme: (isAutomatic: boolean) => void;
  toggleDarkTheme: (isDark: boolean) => void;
  theme: ITheme;
}

class Themes extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <View>
        <ListItem
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Themes</Text>}
        />

        {this.props.isAutomatic || (
          <ListItem
            topDivider={true}
            bottomDivider={true}
            titleStyle={[styles.itemText, { color: theme.color }]}
            title="Dark Mode"
            checkBox={{
              checked: theme.isDark,
              color: colors.primary,
              onPress: () => this.props.toggleDarkTheme(theme.isDark)
            }}
          />
        )}

        <ListItem
          titleStyle={[styles.itemText, { color: theme.color }]}
          switch={{
            onValueChange: (value: boolean) => {
              this.props.toggleAutomaticTheme(value);
            },

            value: this.props.isAutomatic
          }}
          title={
            <Text style={[styles.itemText, styles.itemTextUnder]}>
              Automatically changes to dark mode at sunset and light mode at
              sunrise.
            </Text>
          }
        />
      </View>
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
