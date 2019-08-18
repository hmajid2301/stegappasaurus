import { create } from "apisauce";
import NetInfo from "@react-native-community/netinfo";
import { mount, shallow } from "enzyme";
import React from "react";
import { Linking } from "react-native";

import Snackbar from "~/components/Snackbar";
import Progress from "~/views/Home/Encoding/Progress";

jest.mock("apisauce");
jest.mock("expo-file-system", () => ({
  writeAsStringAsync: jest.fn(),
  deleteAsync: jest.fn(),
  EncodingType: {
    Base64: "Hello"
  }
}));
jest.mock("expo-media-library", () => ({
  createAssetAsync: jest.fn()
}));
jest.mock("@react-native-community/netinfo");

const navigate = {
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn()
};

describe("Encoding Progress: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(
      <Progress
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
      <Progress
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

describe("Encoding Progress: Functions", () => {
  let instance: React.Component<{}, {}, any>;
  beforeAll(() => {
    const component = mount(
      <Progress
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
});

describe("Encoding Progress: Functions", () => {
  let instance: React.Component<{}, {}, any>;
  beforeAll(() => {
    const component = mount(
      <Progress
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

  test("checkNetworkStatus: notConnected", async () => {
    const spy = jest.spyOn(Snackbar, "show");
    const failedSpy = jest.spyOn(
      Progress.prototype as any,
      "sendUserBackToMain"
    );
    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: false,
      type: "cellular"
    });

    await (instance as any).checkNetworkStatus();
    expect(spy).toHaveBeenCalled();
    expect(failedSpy).toHaveBeenCalled();
  });

  test("checkNetworkStatus: cellular", async () => {
    const spy = jest.spyOn(Snackbar, "show");
    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: true,
      type: "cellular"
    });
    await (instance as any).checkNetworkStatus();
    expect(spy).toHaveBeenCalled();
  });

  test("encoded", async () => {
    const spy = jest.spyOn(Snackbar, "show");
    await (instance as any).encoded(
      "data:image/jpeg;base64,/BAMNBAHGDJSGUGvJVAD/2"
    );
    expect(spy).toHaveBeenCalled();
  });

  test("openAlbum", async () => {
    const spy = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    await (instance as any).openAlbum();
    expect(spy).toHaveBeenCalled();
  });

  test("failedResponse: goBack", () => {
    const spy = jest.fn();
    navigate["goBack"] = spy;
    (instance as any).failedResponse({ code: "MessageTooLong" }, 500);
    expect(spy).toHaveBeenCalled();
  });

  test("failedResponse: sendUserBackToMain", () => {
    const spy = jest.spyOn(Progress.prototype as any, "sendUserBackToMain");
    (instance as any).failedResponse({ code: "ServerError" }, 400);
    expect(spy).toHaveBeenCalled();
  });
});

describe("Encoding Progress: API", () => {
  let instance: React.Component<{}, {}, any>;
  beforeAll(() => {
    const component = mount(
      <Progress
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
    jest
      .spyOn(Progress.prototype as any, "checkNetworkStatus")
      .mockResolvedValue(true);
  });

  test("callEncodeAPI: pass", async () => {
    const spy = jest
      .spyOn(Progress.prototype as any, "encoded")
      .mockResolvedValue(true);
    (create as jest.Mock).mockReturnValue({
      post: jest.fn().mockReturnValue({
        ok: true,
        data: {
          encoded: "data:image/jpeg;base64,/BAMNBAHGDJSGUGvJVAD/2"
        }
      })
    });

    await (instance as any).callEncodeAPI(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2"
    );
    expect(spy).toHaveBeenCalled();
  });

  test("callEncodeAPI: fail", async () => {
    const spy = jest
      .spyOn(Progress.prototype as any, "failedResponse")
      .mockResolvedValue(true);
    (create as jest.Mock).mockReturnValue({
      post: jest.fn().mockReturnValue({
        ok: false
      })
    });

    await (instance as any).callEncodeAPI(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2"
    );
    expect(spy).toHaveBeenCalled();
  });
});
