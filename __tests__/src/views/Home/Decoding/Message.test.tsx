import { shallow } from "enzyme";
import React from "react";

import Message from "~/views/Home/Decoding/Message";

describe("Decoding Message: Match Snapshots", () => {
  test("1", () => {
    const navigate = {
      navigate: jest.fn(),
      getParam: jest.fn()
    };
    const component = shallow(<Message navigation={navigate as any} />);
    expect(component).toMatchSnapshot();
  });
});
