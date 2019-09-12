import { mount, shallow } from "enzyme";
import React from "react";

import Snackbar from "~/actions/Snackbar";
import Progress from "~/views/Home/Encoding/Progress";

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

    await (instance as any).checkNetworkStatus();
    expect(spy).toHaveBeenCalled();
    expect(failedSpy).toHaveBeenCalled();
  });

  test("checkNetworkStatus: cellular", async () => {
    const spy = jest.spyOn(Snackbar, "show");
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
    instance.setState({ source: { token: "hello" } });

    await (instance as any).callEncodeAPI(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2"
    );
    expect(spy).toHaveBeenCalled();
  });

  test("callEncodeAPI: fail", async () => {
    const spy = jest
      .spyOn(Progress.prototype as any, "failedResponse")
      .mockResolvedValue(true);

    await (instance as any).callEncodeAPI(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2"
    );
    expect(spy).toHaveBeenCalled();
  });
});
