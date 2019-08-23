import { mount, shallow } from "enzyme";
import React from "react";

import AppHeader from "~/components/AppHeader";

jest.mock("react-navigation");
const navigation = {
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  state: {
    routes: [
      {
        key: "Encoding",
        isTransitioning: false,
        index: 1,
        routes: [
          { routeName: "Main", key: "id-1565732047195-0" },
          {
            params: {
              uri:
                "file:/data/user/0/com.stegappasaurus/cache/ImagePicker/a89493b5-e2a5-4546-80f3-4fb13d2461d8.png"
            },
            routeName: "EncodingMessage",
            key: "id-1565732047195-2"
          }
        ],
        routeName: "Encoding"
      },
      {
        key: "Decoding",
        isTransitioning: false,
        index: 0,
        routes: [{ routeName: "Main", key: "id-1565732047195-1" }],
        routeName: "Decoding"
      }
    ],
    index: 0,
    isTransitioning: false,
    key: "Home",
    routeName: "Home"
  }
};

describe("AppHeader: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <AppHeader
        // @ts-ignore
        navigation={navigation}
        primaryColor="#009CFF"
        theme={{ background: "#17212D", color: "#FFF", isDark: false }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <AppHeader
        // @ts-ignore
        navigation={navigation}
        primaryColor="#E88C0C"
        theme={{ background: "#FFF", color: "#17212D", isDark: true }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("AppHeader: OnPress Props", () => {
  test("LeftComponent", () => {
    const component = mount(
      <AppHeader
        // @ts-ignore
        navigation={navigation}
        primaryColor="#009CFF"
        theme={{ background: "#17212D", color: "#FFF", isDark: false }}
      />
    );

    const spy = jest.spyOn(navigation as any, "openDrawer");
    (component.find("Header").props() as any).leftComponent.props.onPress();
    expect(spy).toHaveBeenCalled();
  });

  test("RightComponent", () => {
    const component = mount(
      <AppHeader
        // @ts-ignore
        navigation={navigation}
        primaryColor="#009CFF"
        theme={{ background: "#17212D", color: "#FFF", isDark: false }}
      />
    );

    const spy = jest.spyOn(navigation as any, "navigate");
    (component.find("Header").props() as any).rightComponent.props.onPress();
    expect(spy).toHaveBeenCalled();
  });
});
