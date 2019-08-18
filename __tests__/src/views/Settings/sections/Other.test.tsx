import { mount, shallow } from "enzyme";
import React from "react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import OtherConnected, { Other } from "~/views/Settings/sections/Other";

describe("Other: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(
      <Other color="#17212D" background="#FFF" resetPreferences={() => null} />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <Other color="#FFF" background="#17212D" resetPreferences={() => null} />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("Other: Props", () => {
  test("OnPress", async () => {
    const component = mount(
      <Other color="#FFF" background="#17212D" resetPreferences={() => null} />
    );
    const prop = component
      .find("TouchableOpacity")
      .last()
      .props() as any;
    prop.onPress();
    expect(prop).toBeTruthy();
  });
});

describe("Other: Redux", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  beforeAll(() => {
    const mockStore = configureStore();
    const initialState = {};
    store = mockStore(initialState);
  });

  test("mapDispatchToProps", () => {
    const component = shallow(
      //@ts-ignore
      <OtherConnected color="#FFF" background="#17212D" store={store} />
    );
    (component.props() as any).resetPreferences();
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
  });
});
