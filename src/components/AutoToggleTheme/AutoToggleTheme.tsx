import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import moment from "moment";
import { AsyncStorage } from "react-native";
import { getSunrise, getSunset } from "sunrise-sunset-js";

import Snackbar from "~/components/Snackbar";

export default class AutoToggleTheme {
  public shouldToggleTheme = async () => {
    const { sunrise, sunset } = await this.getSunriseAndSunsetTime();
    let toggleTheme = false;

    if (sunrise !== null && sunset !== null) {
      const currentTime = new Date();

      if (currentTime > sunrise && currentTime < sunset) {
        toggleTheme = true;
      }
    }

    return toggleTheme;
  };

  private getSunriseAndSunsetTime = async () => {
    const { latitude, longitude } = await this.getLatitudeLongitude();

    if (isNaN(latitude)) {
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
