import { shallow } from "enzyme";
import React from "react";

import Encoding from "~/views/Home/Encoding";

describe("Encoding: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(<Encoding />);
    expect(component).toMatchSnapshot();
  });
});
