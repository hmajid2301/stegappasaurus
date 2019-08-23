import AsyncStorage from "@react-native-community/async-storage";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import AutoToggleTheme from "~/actions/AutoToggleTheme";

jest.mock("expo-permissions");
jest.mock("expo-location");
jest.mock("react-native-snackbar");

const testData = [
  {
    date: "2019-05-14T20:01:58.135Z",
    location: {
      serviceEnabled: true,
      currentLocation: {
        coords: {
          latitude: 51.5,
          longitude: -0.12
        }
      }
    },
    permission: { status: "granted" },
    result: true,
    storage: {
      lastQueried: "",
      latitude: "",
      longitude: ""
    }
  },
  {
    date: "2019-05-14T14:01:58.135Z",
    location: {
      serviceEnabled: true,
      currentLocation: {
        coords: {
          latitude: 51.5,
          longitude: -0.12
        }
      }
    },
    permission: { status: "granted" },
    result: false,
    storage: {
      lastQueried: "",
      latitude: "",
      longitude: ""
    }
  },
  {
    date: "2019-07-30T13:00:00.135Z",
    location: {
      serviceEnabled: true,
      currentLocation: {}
    },
    permission: { status: "no" },
    result: false,
    storage: {
      lastQueried: "",
      latitude: "",
      longitude: ""
    }
  },
  {
    date: "2019-05-14T08:01:58.135Z",
    location: {
      serviceEnabled: true,
      currentLocation: {}
    },
    permission: { status: "granted" },
    result: true,
    storage: {
      lastQueried: "2019-05-13T22:00:00.000Z",
      latitude: "40.71",
      longitude: "-74"
    }
  },
  {
    date: "2019-05-14T11:01:58.135Z",
    location: {
      serviceEnabled: false,
      currentLocation: {}
    },
    permission: { status: "granted" },
    result: false,
    storage: {
      lastQueried: "2019-05-13T22:00:00.000Z",
      latitude: "40.71",
      longitude: "-74"
    }
  },
  {
    date: "2019-05-14T20:01:58.135Z",
    location: {
      serviceEnabled: true,
      currentLocation: {
        coords: {
          latitude: 52,
          longitude: 13
        }
      }
    },
    permission: { status: "granted" },
    result: true,
    storage: {
      lastQueried: "2019-05-11T18:01:58.135Z",
      latitude: "40.71",
      longitude: "74"
    }
  },
  {
    date: "2019-03-20T23:18:35.135Z",
    location: {
      serviceEnabled: true,
      currentLocation: {}
    },
    permission: { status: "no" },
    result: true,
    storage: {
      lastQueried: "2019-05-14T18:01:58.135Z",
      latitude: "40.71",
      longitude: "-74"
    }
  },
  {
    date: "2019-05-19T14:00:58.135Z",
    location: {
      serviceEnabled: true,
      currentLocation: {}
    },
    permission: { status: "no" },
    result: false,
    storage: {
      lastQueried: "2019-05-14T18:01:58.135Z",
      latitude: "40.71",
      longitude: "-74"
    }
  },
  {
    date: "2019-05-19T14:00:58.135Z",
    location: {
      serviceEnabled: false,
      currentLocation: {}
    },
    permission: { status: "granted" },
    result: false,
    storage: {
      lastQueried: "2019-05-14T18:01:58.135Z",
      latitude: "40.71",
      longitude: "-74"
    }
  }
];

describe("AutoToggleTheme", () => {
  test.each(testData)(
    "AutoToggleTheme",
    async ({ date, location, permission, result, storage }) => {
      (Permissions.askAsync as jest.Mock).mockResolvedValue({
        status: permission.status
      });
      (Location.hasServicesEnabledAsync as jest.Mock).mockResolvedValue(
        location.serviceEnabled
      );
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(
        location.currentLocation
      );

      jest
        .spyOn(global.Date, "now")
        .mockImplementation(() => new Date(date).valueOf());

      await Promise.all([
        AsyncStorage.setItem("@LastQueriedLocationAt", storage.lastQueried),
        AsyncStorage.setItem("@Latitude", storage.latitude),
        AsyncStorage.setItem("@Longitude", storage.longitude)
      ]);

      const toggle = new AutoToggleTheme();
      const shouldToggle = toggle.shouldToggleDarkTheme();
      return expect(shouldToggle).resolves.toEqual(result);
    }
  );

  afterAll(() => {
    jest.clearAllMocks();
  });
});
