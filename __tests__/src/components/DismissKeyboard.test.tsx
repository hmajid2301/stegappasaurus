import { mount, shallow } from "enzyme";
import React from "react";
import { Keyboard, Text } from "react-native";

import DismissKeyboard from "~/components/DismissKeyboard";

describe("DimissKeyboard: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <DismissKeyboard>
        <Text>Random Text</Text>
      </DismissKeyboard>
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <DismissKeyboard>
        <Text>Other Text</Text>
      </DismissKeyboard>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("DimissKeyboard: OnPress Props", () => {
  test("TouchableWithoutFeedback", () => {
    const component = mount(
      <DismissKeyboard>
        <Text>Random Text</Text>
      </DismissKeyboard>
    );

    const spy = jest.spyOn(Keyboard, "dismiss");
    (component.find("TouchableWithoutFeedback").props() as any).onPress();
    expect(spy).toHaveBeenCalled();
  });
});
