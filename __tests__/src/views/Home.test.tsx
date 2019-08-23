import { shallow } from "enzyme";
import React from "react";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import HomeConnected, { Home } from "~/views/Home";
describe("Home: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(
      <Home
        navigation={jest.fn() as any}
        screenProps={{
          theme: {
            color: "#17212D",
            background: "#FFF",
            isDark: false
          }
        }}
        primaryColor="#009CFF"
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <Home
        navigation={jest.fn() as any}
        screenProps={{
          theme: {
            color: "#FFF",
            background: "#17212D",
            isDark: false
          }
        }}
        primaryColor="#009CFF"
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("Home Redux", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeAll(() => {
    const mockStore = configureStore();
    const initialState = {
      TogglePrimaryColor: {
        colorData: {
          color: "#009CFF",
          name: "BLUE"
        }
      }
    };
    store = mockStore(initialState);
  });

  test("mapStateToProps", async () => {
    const component = shallow(
      //@ts-ignore
      <HomeConnected store={store} />
    ).dive();
    expect((component.props() as any).primaryColor).toEqual("#009CFF");
  });
});
