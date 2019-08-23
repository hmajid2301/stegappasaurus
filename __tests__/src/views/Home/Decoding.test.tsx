import { shallow } from "enzyme";
import React from "react";

import Decoding from "~/views/Home/Decoding";

describe("Decoding: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(<Decoding />);
    expect(component).toMatchSnapshot();
  });
});
