import { create } from "apisauce";
import NetInfo from "@react-native-community/netinfo";
import { mount, shallow } from "enzyme";
import React from "react";

import Snackbar from "~/actions/Snackbar";
import Progress from "~/views/Home/Decoding/Progress";

jest.mock("apisauce");
jest.mock("@react-native-community/netinfo");

const navigate = {
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn()
};

describe("Decoding Progress: Match Snapshots", () => {
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

describe("Decoding Progress: Functions", () => {
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
    const failedSpy = jest.spyOn(Progress.prototype as any, "failedResponse");
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

  test("decoded", () => {
    const navigateSpy = jest.fn();
    navigate["navigate"] = navigateSpy;

    (instance as any).decoded("Random Photo");
    expect(navigateSpy).toHaveBeenCalled();
  });

  test("failedResponse", () => {
    const spy = jest.spyOn(Snackbar, "show");
    const navigateSpy = jest.fn();
    navigate["goBack"] = navigateSpy;

    (instance as any).failedResponse();
    expect(spy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
  });
});

describe("Decoding Progress: API", () => {
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

  test("callDecodeAPI: pass", async () => {
    const spy = jest
      .spyOn(Progress.prototype as any, "decoded")
      .mockResolvedValue(true);

    instance.setState({ source: { token: "hello" } });
    (create as jest.Mock).mockReturnValue({
      post: jest.fn().mockReturnValue({
        ok: true,
        data: {
          decoded: "random message"
        }
      })
    });

    await (instance as any).callDecodeAPI(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2"
    );
    expect(spy).toHaveBeenCalled();
  });

  test("callDecodeAPI: failed", async () => {
    const spy = jest
      .spyOn(Progress.prototype as any, "failedResponse")
      .mockResolvedValue(true);

    (create as jest.Mock).mockReturnValue({
      post: jest.fn().mockReturnValue({
        ok: false
      })
    });

    await (instance as any).callDecodeAPI(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2"
    );
    expect(spy).toHaveBeenCalled();
  });
});
