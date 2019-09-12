import { mount, shallow } from "enzyme";
import React from "react";

import Themes from "~/views/Settings/Sections/Themes";

describe("Themes: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(
      <Themes theme={{ color: "#17212D", background: "#FFF", isDark: false }} />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <Themes theme={{ color: "#FFF", background: "#17212D", isDark: false }} />
    );
    expect(component).toMatchSnapshot();
  });
});
