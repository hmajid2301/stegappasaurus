import { mount, shallow } from "enzyme";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import Rate from "react-native-rate";

import AboutList from "~/components/AboutList";
import { about } from "~/data";

jest.mock("expo-web-browser");
jest.mock("react-native-rate");

describe("AboutList: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <AboutList items={about} color="#17212D" backgroundColor="#FFF" />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <AboutList items={about} color="#FFF" backgroundColor="#17212D" />
    );
    expect(component).toMatchSnapshot();
  });

  test("3", () => {
    const component = shallow(
      <AboutList items={[]} color="#FFF" backgroundColor="#17212D" />
    );
    expect(component).toMatchSnapshot();
  });

  test("Title", () => {
    const component = mount(
      <AboutList items={about} color="#FFF" backgroundColor="#17212D" />
    );
    const title = (component
      .find("ListItem")
      .first()
      .props() as any).title;
    expect(title).toMatchSnapshot();
  });
});

describe("AboutList: OnPress Props", () => {
  test("ListItem leftIcon onPress: Web Browser", () => {
    const component = mount(
      <AboutList
        items={[
          {
            icon: {
              color: "#fff",
              name: "versions",
              type: "octicon"
            },
            title: "Version 0.1.0",
            url: "https://github.com/hmajid2301/Stegappasaurus"
          }
        ]}
        color="#FFF"
        backgroundColor="#17212D"
      />
    );

    const spy = jest
      .spyOn(WebBrowser as any, "openBrowserAsync")
      .mockResolvedValue({
        status: true
      });

    (component
      .find("ListItem")
      .first()
      .props() as any).leftIcon.onPress();

    expect(spy).toHaveBeenCalled();
  });

  test("TouchableOpacity onPress: Web Browser", () => {
    const component = mount(
      <AboutList
        items={[
          {
            icon: {
              color: "#fff",
              name: "versions",
              type: "octicon"
            },
            title: "Version 0.1.0",
            url: "https://github.com/hmajid2301/Stegappasaurus"
          }
        ]}
        color="#FFF"
        backgroundColor="#17212D"
      />
    );

    const spy = jest.spyOn(WebBrowser as any, "openBrowserAsync");

    (component
      .find("TouchableOpacity")
      .first()
      .props() as any).onPress();

    expect(spy).toHaveBeenCalled();
  });

  test("TouchableOpacity onPress: Rate app", () => {
    const component = mount(
      <AboutList
        items={[
          {
            function_to_call: "store",
            icon: {
              color: "#ff0000",
              name: "rate-review",
              type: "material"
            },
            title: "Rate the App"
          }
        ]}
        color="#FFF"
        backgroundColor="#17212D"
      />
    );

    const spy = jest.spyOn(Rate as any, "rate");

    (component
      .find("TouchableOpacity")
      .first()
      .props() as any).onPress();
    expect(spy).toHaveBeenCalled();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
