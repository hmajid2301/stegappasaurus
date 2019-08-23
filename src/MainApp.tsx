import AsyncStorage from "@react-native-community/async-storage";
import * as React from "react";
import { AppState, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme, PossibleAppStates } from "@types";
import AutoToggleTheme from "~/actions/AutoToggleTheme";
import IntroSlider from "~/components/IntroSlider";
import Loader from "~/components/Loader";
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
      return <Loader loading={this.state.loading} />;
    } else if (!this.state.introShown) {
      return <IntroSlider slides={slides} onDone={this.introShownToUser} />;
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <App
          screenProps={{
            theme: this.props.theme
          }}
        />
      </View>
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

  private introShownToUser = async () => {
    await AsyncStorage.setItem("@IntroShown", "true");
    this.setState({ introShown: true });
  };

  private appInFocus = async (nextAppState: PossibleAppStates) => {
    if (nextAppState === "active") {
      if (this.props.isAutomatic) {
        try {
          const shouldToggle = await this.toggleTheme.shouldToggleDarkTheme();
          this.props.toggleDarkTheme(shouldToggle);
        } catch {
          this.props.toggleAutomaticTheme(false);
        }
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
