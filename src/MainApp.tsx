import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import moment from "moment";
import * as React from "react";
import { AppState, AsyncStorage, Image, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getSunrise, getSunset } from "sunrise-sunset-js";

import { ITheme, PossibleAppStates } from "@types";
import Snackbar from "~/components/Snackbar";
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

class MainApp extends React.Component<IProps, {}> {
  public render() {
    return (
      <App
        screenProps={{
          theme: this.props.theme
        }}
      />
    );
  }

  public componentWillMount = async () => {
    StatusBar.setHidden(true);
  };

  public componentDidMount = async () => {
    AppState.addEventListener("change", this.appInFocus);
  };

  public componentWillUnmount = () => {
    AppState.removeEventListener("change", this.appInFocus);
  };

  private appInFocus = async (nextAppState: PossibleAppStates) => {
    if (nextAppState === "active") {
      if (this.props.isAutomatic) {
        await this.toggleTheme();
      }
    }
  };

  private toggleTheme = async () => {
    const { sunrise, sunset } = await this.getSunriseAndSunsetTime();
    if (sunrise !== null && sunset !== null) {
      const currentTime = new Date();

      if (currentTime > sunrise && currentTime < sunset) {
        this.props.toggleDarkTheme(true);
      } else {
        this.props.toggleDarkTheme(false);
      }
    }
  };

  private getSunriseAndSunsetTime = async () => {
    const { latitude, longitude } = await this.getLatitudeLongitude();

    if (isNaN(latitude)) {
      this.props.toggleAutomaticTheme(false);
      Snackbar.show({
        text:
          "To use the automatic theme feature, location services must be turned on. Turning off automatic theme."
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

    if (lastQueriedDate > currentDate) {
      ({ latitude, longitude } = await this.getNewLatitudeLongitude(
        currentDate,
        latitude,
        longitude
      ));
    }
    return { latitude, longitude };
  }

  private async getNewLatitudeLongitude(
    currentDate: string,
    latitude: number,
    longitude: number
  ) {
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
