import { mount, shallow } from "enzyme";
import React from "react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import AutoToggleTheme from "~/actions/AutoToggleTheme";
import ThemesConnected, { Themes } from "~/views/Settings/sections/Themes";

describe("Themes: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(
      <Themes
        isAutomatic={true}
        theme={{ color: "#17212D", background: "#FFF", isDark: false }}
        toggleAutomaticTheme={(isAutomatic: boolean) => null}
        toggleDarkTheme={(isDark: boolean) => null}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <Themes
        isAutomatic={true}
        theme={{ color: "#FFF", background: "#17212D", isDark: false }}
        toggleAutomaticTheme={(isAutomatic: boolean) => null}
        toggleDarkTheme={(isDark: boolean) => null}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("Themes: Functions", () => {
  test("toggleAutomatic", async () => {
    const component = mount(
      <Themes
        isAutomatic={false}
        theme={{ color: "#FFF", background: "#17212D", isDark: false }}
        toggleAutomaticTheme={(isAutomatic: boolean) => null}
        toggleDarkTheme={() => jest.fn()}
      />
    );

    const spy = jest
      .spyOn(AutoToggleTheme.prototype, "shouldToggleDarkTheme")
      .mockResolvedValue(true);
    (component.instance() as any).toggleAutomatic();
    expect(spy).toHaveBeenCalled();
  });
});

describe("Themes: Redux", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  beforeAll(() => {
    const mockStore = configureStore();
    const initialState = {
      ToggleAutomaticTheme: {
        isAutomatic: false
      }
    };
    store = mockStore(initialState);
  });

  test("mapStateToProps", async () => {
    const component = shallow(
      //@ts-ignore
      <ThemesConnected store={store} />
    ).dive();
    expect((component.props() as any).isAutomatic).toEqual(false);
  });

  test("mapDispatchToProps", () => {
    const component = shallow(
      //@ts-ignore
      <ThemesConnected store={store} />
    ).dive();
    (component.props() as any).toggleAutomaticTheme(true);
    (component.props() as any).toggleDarkTheme(true);
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });
});
