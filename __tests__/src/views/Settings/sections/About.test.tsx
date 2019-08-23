import { mount, shallow } from "enzyme";
import React from "react";

import About from "~/views/Settings/sections/About";

describe("About: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(<About color="#17212D" background="#FFF" />);
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(<About background="#17212D" color="#FFF" />);
    expect(component).toMatchSnapshot();
  });
  test("3", () => {
    const component = mount(<About background="#17212D" color="#FFF" />);
    expect(
      component
        .find("ListItem")
        .at(1)
        .props().title
    ).toMatchSnapshot();
  });
});

describe("About: Props", () => {
  test("OnPress", async () => {
    const component = mount(<About background="#17212D" color="#FFF" />);
    const prop = component
      .find("TouchableOpacity")
      .last()
      .props() as any;
    prop.onPress();
    expect(prop).toBeTruthy();
  });
});
