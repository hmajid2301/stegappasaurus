import * as React from "react";
import { AppState, AsyncStorage, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme, PossibleAppStates } from "@types";
import AutoToggleTheme from "~/components/AutoToggleTheme";
import IntroSlider from "~/components/IntroSlider";
import { slides } from "~/data";
import { toggleAutomaticTheme, toggleDarkTheme } from "~/redux/actions";
import { IReducerState as IReducerAutomaticTheme } from "~/redux/reducers/ToggleAutomaticTheme";
import { IReducerState as IReducerDarkTheme } from "~/redux/reducers/ToggleDarkTheme";
import App from "./views/Routes";

interface IReducerState extends IReducerAutomaticTheme, IReducerDarkTheme {}

interface IProps {
  isAutomatic: boolean;
  toggleAutomaticTheme: (isAutomatic: boolean) => void;
  toggleDarkTheme: (isDark: boolean) => void;
  theme: ITheme;
}

interface IState {
  introShown: boolean;
}

class MainApp extends React.Component<IProps, IState> {
  private toggleTheme: AutoToggleTheme;

  constructor(props: IProps) {
    super(props);
    this.state = {
      introShown: true
    };

    this.toggleTheme = new AutoToggleTheme();
  }

  public render() {
    if (this.state.introShown) {
      return (
        <App
          screenProps={{
            theme: this.props.theme
          }}
        />
      );
    }

    return <IntroSlider slides={slides} onDone={this.introShownToUser} />;
  }

  public componentWillMount = async () => {
    StatusBar.setHidden(true);
  };

  public componentDidMount = async () => {
    AppState.addEventListener("change", this.appInFocus);
    const wasIntroShown = await AsyncStorage.getItem("introShown");
    if (wasIntroShown === null) {
      this.setState({ introShown: false });
    }
  };

  public componentWillUnmount = () => {
    AppState.removeEventListener("change", this.appInFocus);
  };

  private introShownToUser = async () => {
    await AsyncStorage.setItem("introShown", "true");
    this.setState({ introShown: true });
  };

  private appInFocus = async (nextAppState: PossibleAppStates) => {
    if (nextAppState === "active") {
      if (this.props.isAutomatic) {
        const toggle = await this.toggleTheme.shouldToggleTheme();
        this.props.toggleAutomaticTheme(toggle);
      }
    }
  };
}

const mapStateToProps = (state: IReducerState) => ({
  isAutomatic: state.ToggleAutomaticTheme.isAutomatic,
  theme: state.ToggleDarkTheme.theme
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleAutomaticTheme: (isAutomatic: boolean) =>
    dispatch(toggleAutomaticTheme({ isAutomatic })),
  toggleDarkTheme: (isDark: boolean) => dispatch(toggleDarkTheme({ isDark }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
