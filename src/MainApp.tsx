import { Location, Permissions } from "expo";
import moment from "moment";
import { Toast } from "native-base";
import React, { Component } from "react";
import { AppState, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getSunrise, getSunset } from "sunrise-sunset-js";

import { toggleAutomaticTheme, toggleDarkTheme } from "~/redux/actions";
import { IReducerState as IReducerAutomaticTheme } from "~/redux/reducers/ToggleAutomaticTheme";
import { IReducerState as IReducerDarkTheme } from "~/redux/reducers/ToggleDarkTheme";
import { ITheme, PossibleAppStates } from "~/util/interfaces";
import App from "./views/Routes";

interface IProps {
  isAutomatic: boolean;
  toggleAutomaticTheme: (isAutomatic: boolean) => void;
  toggleDarkTheme: (isDark: boolean) => void;
  theme: ITheme;
}

interface IState {
  appState: PossibleAppStates;
}

interface IReducerState extends IReducerAutomaticTheme, IReducerDarkTheme {}

class MainApp extends Component<IProps, IState> {
  public componentDidMount = async () => {
    AppState.addEventListener("change", this.appInFocus);
    this.state = {
      appState: AppState.currentState
    };
  };

  public componentWillUnmount = () => {
    AppState.removeEventListener("change", this.appInFocus);
  };

  public render() {
    return <App screenProps={{ theme: this.props.theme }} />;
  }

  private appInFocus = async (nextAppState: PossibleAppStates) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      await this.checkAutomaticTheme();
    }
    this.setState({ appState: nextAppState });
  };

  private checkAutomaticTheme = async () => {
    if (this.props.isAutomatic) {
      const { sunrise, sunset } = await this.getSunriseSunsetTime();
      if (sunrise !== null && sunset !== null) {
        const currentTime = new Date();

        if (currentTime > sunrise && currentTime < sunset) {
          this.props.toggleDarkTheme(true);
        } else {
          this.props.toggleDarkTheme(false);
        }
      }
    }
  };

  private getSunriseSunsetTime = async () => {
    const { latitude, longitude } = await this.getLatitudeLongitude();

    if (isNaN(latitude)) {
      this.props.toggleAutomaticTheme(false);
      Toast.show({
        buttonText: "Okay",
        duration: 5000,
        text:
          "For automatic theme location services need to be turned on. Turning off automatic theme."
      });
      return { sunset: null, sunrise: null };
    }

    const sunset = getSunset(latitude, longitude);
    const sunrise = getSunrise(latitude, longitude);
    return { sunset, sunrise };
  };

  private async getLatitudeLongitude() {
    const currentDate = moment().toISOString();
    const lastQueried = await AsyncStorage.getItem("@LastQueriedLocation");
    let lastQueriedDate = currentDate;
    if (lastQueried !== null) {
      lastQueriedDate = moment(lastQueried)
        .add(7, "days")
        .toISOString();
    }

    let latitude = parseInt(
      (await AsyncStorage.getItem("@Latitude")) || "0",
      10
    );
    let longitude = parseInt(
      (await AsyncStorage.getItem("@Longitude")) || "0",
      10
    );
    ({ latitude, longitude } = await this.getNewLatitudeLongitude(
      lastQueriedDate,
      currentDate,
      latitude,
      longitude
    ));
    return { latitude, longitude };
  }

  private async getNewLatitudeLongitude(
    lastQueriedDate: string,
    currentDate: string,
    latitude: number,
    longitude: number
  ) {
    if (lastQueriedDate > currentDate) {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        const locationOn = await Location.hasServicesEnabledAsync();
        if (locationOn) {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest
          });

          latitude = location.coords.latitude;
          longitude = location.coords.longitude;
          await AsyncStorage.setItem("@Latitude", JSON.stringify(latitude));
          await AsyncStorage.setItem("@Longitude", JSON.stringify(longitude));
          await AsyncStorage.setItem("@LastQueriedLocation", currentDate);
        }
      }
    }
    return { latitude, longitude };
  }
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
