import * as React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme } from "@types";
import AutoToggleTheme from "~/actions/AutoToggleTheme";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/modules";
import { toggleAutomaticTheme, toggleDarkTheme } from "~/redux/actions";
import { IReducerState } from "~/redux/reducers/ToggleAutomaticTheme";
import styles from "./styles";

interface IProps {
  isAutomatic: boolean;
  toggleAutomaticTheme: (isAutomatic: boolean) => void;
  toggleDarkTheme: (isDark: boolean) => void;
  theme: ITheme;
}

export class Themes extends React.Component<IProps, {}> {
  private toggleTheme: AutoToggleTheme;

  constructor(props: IProps) {
    super(props);
    this.toggleTheme = new AutoToggleTheme();
  }

  public render() {
    const { theme } = this.props;

    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Themes</Text>}
        />

        {this.props.isAutomatic || (
          <ListItem
            containerStyle={{
              backgroundColor: theme.background
            }}
            topDivider={true}
            bottomDivider={true}
            titleStyle={[styles.itemText, { color: theme.color }]}
            title="Dark Mode"
            checkBox={{
              checked: theme.isDark,
              checkedColor: colors.primary,
              onPress: () => this.props.toggleDarkTheme(!theme.isDark)
            }}
          />
        )}

        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          titleStyle={[styles.itemText, { color: theme.color }]}
          checkBox={{
            checked: this.props.isAutomatic,
            checkedColor: colors.primary,
            onPress: async () => {
              await this.toggleAutomatic();
            }
          }}
          title={
            <View>
              <Text style={[styles.itemText, { color: theme.color }]}>
                Automatic Theme
              </Text>
              <Text style={[styles.itemText, styles.itemTextUnder]}>
                Automatically changes to dark mode at sunset and light mode at
                sunrise.
              </Text>
            </View>
          }
        />
      </View>
    );
  }
  private toggleAutomatic = async () => {
    this.props.toggleAutomaticTheme(!this.props.isAutomatic);
    let toggle = false;
    try {
      if (!this.props.isAutomatic) {
        toggle = await this.toggleTheme.shouldToggleDarkTheme();
      }
      this.props.toggleDarkTheme(toggle);
    } catch (err) {
      this.props.toggleAutomaticTheme(false);
      Snackbar.show({
        text: "To use the automatic theme, location services must be turned on."
      });
    }
  };
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
