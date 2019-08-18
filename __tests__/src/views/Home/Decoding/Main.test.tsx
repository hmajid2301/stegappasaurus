import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { mount, shallow } from "enzyme";
import React from "react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { PrimaryColorNames } from "@types";
import Snackbar from "~/components/Snackbar";
import MainConnected, { Main } from "~/views/Home/Decoding/Main";

jest.mock("react-native-share-menu");
const navigate = {
  navigate: jest.fn(),
  getParam: jest.fn(),
  addListener: jest.fn()
};

jest.mock("expo-permissions");
jest.mock("expo-image-picker");

describe("Decoding Main: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(
      <Main
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: "#FFF",
            color: "#17212D",
            isDark: false
          }
        }}
        togglePrimaryColor={(primaryColor: PrimaryColorNames) => null}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <Main
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: "#17212D",
            color: "#FFF",
            isDark: false
          }
        }}
        togglePrimaryColor={(primaryColor: PrimaryColorNames) => null}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("Decoding Main: Functions", () => {
  let instance: React.Component<{}, {}, any>;
  beforeAll(() => {
    const component = mount(
      <Main
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: "#17212D",
            color: "#FFF",
            isDark: false
          }
        }}
        togglePrimaryColor={(primaryColor: PrimaryColorNames) => null}
      />
    );
    instance = component.instance();
  });

  test("getPhotoFromCameraRoll: selectPhotosToEncode", async () => {
    (Permissions.askAsync as jest.Mock).mockResolvedValue({
      status: "granted"
    });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      cancelled: false,
      uri: "test.png"
    });
    const spy = jest.spyOn(Main.prototype as any, "selectPhotoToEncode");
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });

  test("getPhotoFromCameraRoll: Snackbar", async () => {
    (Permissions.askAsync as jest.Mock).mockResolvedValue({
      status: "no"
    });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      cancelled: false,
      uri: "test.png"
    });
    const spy = jest.spyOn(Snackbar, "show");
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });
});

describe("Decoding Main: Redux", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  beforeAll(() => {
    const mockStore = configureStore();
    const initialState = {};
    store = mockStore(initialState);
  });

  test("mapDispatchToProps", () => {
    const component = shallow(
      //@ts-ignore
      <MainConnected
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: "#17212D",
            color: "#FFF",
            isDark: false
          }
        }}
        store={store}
      />
    );
    (component.props() as any).togglePrimaryColor("BLUE");
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });
});
