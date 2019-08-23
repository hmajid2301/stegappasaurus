import { shallow } from "enzyme";
import React from "react";

import App from "~/views/Routes";
describe("Routes: Match Snapshots", () => {
  test("1", () => {
    const component = shallow(<App />);
    expect(component).toBeTruthy();
  });
});
