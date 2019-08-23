import { mount, shallow } from "enzyme";
import React from "react";

import ImageMessage from "~/components/ImageMessage";

const navigation = {
  addListener: jest.fn()
};

describe("ImageMessage: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <ImageMessage
        action={() => null}
        navigation={navigation as any}
        editable={true}
        photo={"images.png"}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <ImageMessage
        action={() => null}
        navigation={navigation as any}
        editable={true}
        message="Hello"
        photo={"images.png"}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("ImageMessag Props", () => {
  test("onChangeText", () => {
    const component = mount(
      <ImageMessage
        action={() => null}
        navigation={navigation as any}
        editable={true}
        photo={"images.png"}
      />
    );

    (component
      .find("TextInput")
      .first()
      .props() as any).onChangeText("Hello");

    expect(component.state("message")).toEqual("Hello");
  });

  test("onSubmitEditting", () => {
    const action = jest.fn();
    const component = mount(
      <ImageMessage
        action={action}
        navigation={navigation as any}
        editable={true}
        photo={"images.png"}
      />
    );

    (component
      .find("TextInput")
      .first()
      .props() as any).onSubmitEditing("Hello");

    expect(action).toHaveBeenCalled();
  });
});
