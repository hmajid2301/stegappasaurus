import { shallow } from "enzyme";
import React from "react";

import Home from "~/views/Home";
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
      />
    );
    expect(component).toMatchSnapshot();
  });
});
