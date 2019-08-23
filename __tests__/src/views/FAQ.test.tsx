import { shallow } from "enzyme";
import React from "react";

import AboutUs from "~/views/AboutUs";
describe("AboutUs: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(
      <AboutUs
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
      <AboutUs
        navigation={jest.fn() as any}
        screenProps={{
          theme: {
            background: "#17212D",
            color: "#FFF",
            isDark: true
          }
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
