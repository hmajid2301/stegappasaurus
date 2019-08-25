import AsyncStorage from "@react-native-community/async-storage";
import { mount, shallow, ReactWrapper } from "enzyme";
import React from "react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { ThemeColors } from "@types";
import AutoToggleTheme from "~/actions/AutoToggleTheme";
import { colors } from "~/modules";
import MainAppConnected, { MainApp } from "~/MainApp";

const toggleDarkTheme = (isDark: boolean) => {
  isDark = !isDark;
};

const toggleAutomaticTheme = (isAutomatic: boolean) => {
  isAutomatic = !isAutomatic;
};

const props = {
  isAutomatic: true,
  toggleAutomaticTheme: (isAutomatic: boolean) => toggleAutomaticTheme(true),
  toggleDarkTheme: (isDark: boolean) => toggleDarkTheme(true),
  theme: {
    background: colors.darkColor as ThemeColors,
    color: colors.pureWhite as ThemeColors,
    isDark: true
  }
};

jest.mock("~/views/Routes", () => "App");
describe("MainApp: Match snapshots", () => {
  test("1: Normal", () => {
    const component = shallow(<MainApp {...props} />);
    expect(component).toMatchSnapshot();
  });

  test("2: Loading", () => {
    const component = shallow(<MainApp {...props} />);
    component.setState({ loading: true });
    expect(component).toMatchSnapshot();
  });

  test("3: No Intro Slides", () => {
    const component = shallow(<MainApp {...props} />);
    component.setState({ introShown: "true" });
    expect(component).toMatchSnapshot();
  });
});

describe("MainApp: Functions", () => {
  let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let instance: React.Component<{}, {}, any>;

  beforeAll(async () => {
    component = mount(<MainApp {...props} />);
    instance = component.instance();
  });

  const testData = [
    {
      introShown: null,
      expectedResult: false
    },
    {
      introShown: "false",
      expectedResult: false
    },
    {
      introShown: "true",
      expectedResult: true
    }
  ];
  test.each(testData)(
    "componentDidMount",
    async ({ expectedResult, introShown }) => {
      if (introShown) {
        await AsyncStorage.setItem("@IntroShown", introShown);
      }
      const componentSpy = await jest.spyOn(
        MainApp.prototype,
        "componentDidMount"
      );

      await (instance as any).componentDidMount();
      expect(component.state("loading")).toBe(false);
      expect(component.state("introShown")).toBe(expectedResult);
      expect(componentSpy).toHaveBeenCalled();
    }
  );

  test("componentWillUnmount", () => {
    const componentSpy = jest.spyOn(MainApp.prototype, "componentWillUnmount");
    (instance as any).componentWillUnmount();
    expect(componentSpy).toHaveBeenCalled();
  });

  test("introShownToUser", async () => {
    await (instance as any).introShownToUser();
    expect(component.state("introShown")).toBe(true);
  });

  const appData = [
    {
      appInFocus: "active",
      timesCalled: 1
    },
    {
      appInFocus: "background",
      timesCalled: 0
    }
  ];
  test.each(appData)("appInFocus", async ({ appInFocus, timesCalled }) => {
    const toggleSpy = jest
      .spyOn(AutoToggleTheme.prototype, "shouldToggleDarkTheme")
      .mockResolvedValue(true);
    await (instance as any).appInFocus(appInFocus);

    expect(toggleSpy).toHaveBeenCalledTimes(timesCalled);
    toggleSpy.mockClear();
  });
});

describe("MainApp Redux", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  beforeAll(() => {
    const mockStore = configureStore();
    const initialState = {
      ToggleDarkTheme: {
        theme: props["theme"]
      },
      ToggleAutomaticTheme: {
        isAutomatic: true
      }
    };
    store = mockStore(initialState);
  });

  test("mapStateToProps", async () => {
    const component = shallow(
      //@ts-ignore
      <MainAppConnected store={store} />
    ).dive();
    expect((component.props() as any).theme).toEqual(props["theme"]);
    expect((component.props() as any).isAutomatic).toEqual(true);
  });

  test("mapDispatchToProps", async () => {
    const component = shallow(
      //@ts-ignore
      <MainAppConnected store={store} />
    ).dive();
    (component.props() as any).toggleDarkTheme(true);
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });
});
