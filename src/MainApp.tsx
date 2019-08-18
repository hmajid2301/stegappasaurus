import AsyncStorage from "@react-native-community/async-storage";
import * as React from "react";
import { ActivityIndicator, AppState, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme, PossibleAppStates } from "@types";
import AutoToggleTheme from "~/actions/AutoToggleTheme";
import IntroSlider from "~/components/IntroSlider";
import { slides } from "~/data";
import { toggleDarkTheme } from "~/redux/actions";
import { IReducerState as IReducerAutomaticTheme } from "~/redux/reducers/ToggleAutomaticTheme";
import { IReducerState as IReducerDarkTheme } from "~/redux/reducers/ToggleDarkTheme";
import App from "./views/Routes";

interface IReducerState extends IReducerAutomaticTheme, IReducerDarkTheme {}

interface IProps {
  isAutomatic: boolean;
  toggleDarkTheme: (isDark: boolean) => void;
  theme: ITheme;
}

interface IState {
  loading: boolean;
  introShown: boolean | null;
}

export class MainApp extends React.Component<IProps, IState> {
  private toggleTheme: AutoToggleTheme;

  constructor(props: IProps) {
    super(props);
    this.state = {
      introShown: false,
      loading: true
    };

    this.toggleTheme = new AutoToggleTheme();
  }

  public render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    } else if (!this.state.introShown) {
      return <IntroSlider slides={slides} onDone={this.introShownToUser} />;
    }
    return (
      <App
        screenProps={{
          theme: this.props.theme
        }}
      />
    );
  }

  public async componentDidMount() {
    StatusBar.setHidden(true);
    AppState.addEventListener("change", this.appInFocus);
    const storedIntroShown = await AsyncStorage.getItem("@IntroShown");
    if (storedIntroShown) {
      const introShown = storedIntroShown === "true" ? true : false;
      this.setState({ introShown });
    }
    this.setState({ loading: false });
  }

  public componentWillUnmount() {
    AppState.removeEventListener("change", this.appInFocus);
  }

  private async introShownToUser() {
    await AsyncStorage.setItem("@IntroShown", "true");
    this.setState({ introShown: true });
  }

  private async appInFocus(nextAppState: PossibleAppStates) {
    if (nextAppState === "active") {
      if (this.props.isAutomatic) {
        const shouldToggle = await this.toggleTheme.shouldToggleDarkTheme();
        this.props.toggleDarkTheme(shouldToggle);
      }
    }
  }
}

const mapStateToProps = (state: IReducerState) => ({
  isAutomatic: state.ToggleAutomaticTheme.isAutomatic,
  theme: state.ToggleDarkTheme.theme
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDarkTheme: (isDark: boolean) => dispatch(toggleDarkTheme({ isDark }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
