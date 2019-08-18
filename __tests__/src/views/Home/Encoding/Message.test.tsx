import { mount, shallow } from "enzyme";
import React from "react";

import Message from "~/views/Home/Encoding/Message";
import Snackbar from "~/components/Snackbar";

describe("Encoding Message: Match Snapshots", () => {
  test("1", () => {
    const navigate = {
      navigate: jest.fn(),
      getParam: jest.fn()
    };
    const component = shallow(<Message navigation={navigate as any} />);
    expect(component).toMatchSnapshot();
  });
});

describe("Encoding Message: Function", () => {
  let instance: React.Component<{}, {}, any>;
  let addSpy = jest.fn();

  beforeAll(() => {
    const navigate = {
      navigate: jest.fn(),
      getParam: jest.fn(),
      addListener: addSpy
    };
    const component = mount(<Message navigation={navigate as any} />);
    instance = component.instance();
  });

  test("Empty Message", () => {
    const spy = jest.spyOn(Snackbar, "show");
    (instance as any).onSubmit("");
    expect(spy).toHaveBeenCalled();
  });

  test("Not Empty", () => {
    (instance as any).onSubmit("Test!");
    expect(addSpy).toHaveBeenCalled();
  });
});
