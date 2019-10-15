import { shallow } from "enzyme";
import React from "react";

import ImageProgress from "~/components/ImageProgress";

describe("ImageProgress: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <ImageProgress
        animating={true}
        background="#17212D"
        icon={{
          color: "#FFF",
          name: "share",
          size: 130,
          type: "font-awesome"
        }}
        onPress={() => null}
        photo="images.png"
        progress={100}
        primaryColor="#009CFF"
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <ImageProgress
        animating={true}
        background="#FFF"
        icon={{
          color: "#111",
          name: "share",
          size: 100,
          type: "font-awesome"
        }}
        onPress={() => null}
        photo="images.png"
        progress={0}
        primaryColor="#E88C0C"
      />
    );
    expect(component).toMatchSnapshot();
  });
});
