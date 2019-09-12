import { mount, shallow } from "enzyme";
import React from "react";

import Snackbar from "~/actions/Snackbar";
import Main from "~/views/Home/Decoding/Main";

jest.mock("react-native-share-menu");
const navigate = {
  navigate: jest.fn(),
  getParam: jest.fn(),
  addListener: jest.fn()
};

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
      />
    );
    instance = component.instance();
  });

  test("getPhotoFromCameraRoll: selectPhotosToEncode", async () => {
    const spy = jest.spyOn(instance as any, "selectPhotoToDecode");
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });

  test("getPhotoFromCameraRoll: Snackbar", async () => {
    const spy = jest.spyOn(Snackbar, "show");
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });
});
