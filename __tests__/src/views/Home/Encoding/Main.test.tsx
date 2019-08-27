import { create } from "apisauce";
import { mount, shallow } from "enzyme";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";

import Main from "~/views/Home/Encoding/Main";
import Snackbar from "~/components/Snackbar";

jest.mock("apisauce");
jest.mock("expo-image-picker");

const navigate = {
  navigate: jest.fn(),
  getParam: jest.fn(),
  addListener: jest.fn()
};
describe("Encoding Main: Match Snapshots", () => {
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

describe("Encoding Main: Functions", () => {
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

  test("getPhotoFromCamera: photo taken", async () => {
    (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({
      cancelled: false
    });
    const spy = jest.spyOn(instance as any, "selectPhotoToEncode");
    await (instance as any).getPhotoFromCamera();
    expect(spy).toHaveBeenCalled();
  });

  test("getPhotoFromCamera: error", async () => {
    (ImagePicker.launchCameraAsync as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    const spy = jest.spyOn(Snackbar, "show");
    await (instance as any).getPhotoFromCamera();
    expect(spy).toHaveBeenCalled();
  });

  test("getPhotoFromCameraRoll: photo taken", async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      cancelled: false
    });
    const spy = jest.spyOn(instance as any, "selectPhotoToEncode");
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });

  test("getPhotoFromCameraRoll: error", async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockImplementation(
      () => {
        throw new Error();
      }
    );
    const spy = jest.spyOn(Snackbar, "show");
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });

  test("getPhotoFromCatAPI: Pass", async () => {
    (create as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({
        ok: true,
        data: [
          {
            breeds: "bengal",
            id: "1",
            url: "www.example.com/cat.png",
            width: 100,
            height: 100
          }
        ]
      })
    });
    const spy = jest.spyOn(instance as any, "selectPhotoToEncode");
    await (instance as any).getPhotoFromCatAPI();
    expect(spy).toHaveBeenCalled();
  });

  test("getPhotoFromCatAPI: Fail", async () => {
    (create as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({
        ok: false
      })
    });
    const spy = jest.spyOn(Snackbar, "show");
    await (instance as any).getPhotoFromCatAPI();
    expect(spy).toHaveBeenCalled();
  });

  test("selectPhotoToEncode", () => {
    const spy = jest.fn();
    navigate["navigate"] = spy;
    (instance as any).selectPhotoToEncode();
    expect(spy).toHaveBeenCalled();
  });
});
