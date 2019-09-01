import AsyncStorage from "@react-native-community/async-storage";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getSunrise, getSunset } from "sunrise-sunset-js";

import Snackbar from "~/actions/Snackbar";

export default class AutoToggleTheme {
  private static oneDay = 24 * 60 * 60 * 1000;

  public async shouldToggleDarkTheme() {
    const currentTime = new Date(Date.now());
    const { sunrise, sunset } = await this.getSunriseAndSunsetTime(currentTime);
    let toggleTheme = true;

    if (sunrise !== null && sunset !== null) {
      if (currentTime > sunrise && currentTime < sunset) {
        toggleTheme = false;
      }
    }

    return toggleTheme;
  }

  private async getSunriseAndSunsetTime(currentTime: Date) {
    const { latitude, longitude } = await this.getLatitudeLongitude();
    let sunset = null;
    let sunrise = null;

    if (!isNaN(latitude)) {
      sunset = getSunset(latitude, longitude, currentTime);
      sunrise = getSunrise(latitude, longitude, currentTime);

      if (sunrise > sunset) {
        sunset = new Date(sunset.getTime() + AutoToggleTheme.oneDay);
      }
    }
    return { sunset, sunrise };
  }

  private async getLatitudeLongitude() {
    const currentDate = new Date(Date.now());
    const lastQueried = await AsyncStorage.getItem("@LastQueriedLocation");
    let latitude: number;
    let longitude: number;
    let lastQueriedDate: Date;

    if (lastQueried) {
      lastQueriedDate = new Date(lastQueried);
    } else {
      lastQueriedDate = new Date(
        currentDate.getTime() - AutoToggleTheme.oneDay
      );
    }

    if (
      currentDate.getTime() - lastQueriedDate.getTime() >=
      AutoToggleTheme.oneDay
    ) {
      ({ latitude, longitude } = await this.getNewLatitudeLongitude(
        currentDate
      ));
    } else {
      latitude = Number((await AsyncStorage.getItem("@Latitude")) || "51.5");
      longitude = Number((await AsyncStorage.getItem("@Longitude")) || "-0.12");
    }

    return { latitude, longitude };
  }

  private async getNewLatitudeLongitude(currentDate: Date) {
    let latitude;
    let longitude;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const locationOn = await Location.hasServicesEnabledAsync();

      if (locationOn) {
        const location = await Location.getCurrentPositionAsync({});
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;

        await Promise.all([
          AsyncStorage.setItem("@Latitude", JSON.stringify(latitude)),
          AsyncStorage.setItem("@Longitude", JSON.stringify(longitude)),
          AsyncStorage.setItem(
            "@LastQueriedLocation",
            JSON.stringify(currentDate)
          )
        ]);
      }
    }

    if (latitude === undefined || longitude === undefined) {
      throw Error("No location found");
    }

    return { latitude, longitude };
  }
}
