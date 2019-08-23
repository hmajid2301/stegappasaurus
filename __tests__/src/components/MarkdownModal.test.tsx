import { mount, shallow } from "enzyme";
import React from "react";

import MarkdownModal from "~/components/MarkdownModal";
import changelog from "~/data/changelog";
import license from "~/data/license";
import privatePolicy from "~/data/privatePolicy";
import termsOfUse from "~/data/termsOfUse";

describe("MarkdownModal: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <MarkdownModal background="#17212D" color="#FFF" name="Private Policy">
        {privatePolicy}
      </MarkdownModal>
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <MarkdownModal background="#17212D" color="#FFF" name="License">
        {license}
      </MarkdownModal>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("MarkdownModal Props", () => {
  test("Modal: onRequestClose", () => {
    const component = mount(
      <MarkdownModal background="#17212D" color="#FFF" name="License">
        {license}
      </MarkdownModal>
    );

    (component
      .find("Modal")
      .first()
      .props() as any).onRequestClose();
    expect(component.state("isVisible")).toEqual(false);
  });

  test("TouchableOpacity: onPress", () => {
    const component = mount(
      <MarkdownModal background="#17212D" color="#FFF" name="Changelog">
        {changelog}
      </MarkdownModal>
    );

    (component
      .find("TouchableOpacity")
      .first()
      .props() as any).onPress();
    expect(component.state("isVisible")).toEqual(true);
  });

  test("TouchableOpacity2: onPress", () => {
    const component = mount(
      <MarkdownModal background="#17212D" color="#FFF" name="Terms of Use">
        {termsOfUse}
      </MarkdownModal>
    );

    (component
      .find("TouchableOpacity")
      .last()
      .props() as any).onPress();
    expect(component.state("isVisible")).toEqual(true);
  });
});
