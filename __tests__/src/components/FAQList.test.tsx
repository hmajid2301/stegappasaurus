import { mount, shallow } from "enzyme";
import React from "react";

import FAQList from "~/components/FAQList";
import { questions } from "~/data";

describe("FAQList: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <FAQList items={questions} color="#17212D" backgroundColor="#FFF" />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      <FAQList items={questions} backgroundColor="#FFF" color="#17212D" />
    );
    expect(component).toMatchSnapshot();
  });

  test("3", () => {
    const component = shallow(
      <FAQList items={[]} backgroundColor="#FFF" color="#17212D" />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("FAQList: Functions", () => {
  test("renderContent", () => {
    const component = mount(
      <FAQList items={questions} color="#17212D" backgroundColor="#FFF" />
    );
    const renderContent = (component.instance() as any).renderContent({
      content:
        "Steganography is the art/science of hiding data in plain sight. In the context of this app, it allows " +
        "you to hide messages (text) within images. You do this by encoding the image with the text data. You can then share the image " +
        "with other people and they can decode the image (retrieve the original message) using this app.",
      title: "What is steganography?"
    });

    expect(renderContent).toMatchSnapshot();
  });

  test("renderContent: no content", () => {
    const component = mount(
      <FAQList items={questions} color="#17212D" backgroundColor="#FFF" />
    );
    const renderContent = (component.instance() as any).renderContent({
      content: "",
      title: ""
    });

    expect(renderContent).toMatchSnapshot();
  });

  test("renderHeader: Active", () => {
    const component = mount(
      <FAQList items={questions} color="#17212D" backgroundColor="#FFF" />
    );
    const renderHeader = (component.instance() as any).renderHeader(
      {
        content:
          "Steganography is the art/science of hiding data in plain sight. In the context of this app, it allows " +
          "you to hide messages (text) within images. You do this by encoding the image with the text data. You can then share the image " +
          "with other people and they can decode the image (retrieve the original message) using this app.",
        title: "What is steganography?"
      },
      "",
      true
    );

    expect(renderHeader).toMatchSnapshot();
  });

  test("renderHeader: Not Active", () => {
    const component = mount(
      <FAQList items={questions} color="#17212D" backgroundColor="#FFF" />
    );
    const renderHeader = (component.instance() as any).renderHeader(
      {
        content:
          "Steganography is the art/science of hiding data in plain sight. In the context of this app, it allows " +
          "you to hide messages (text) within images. You do this by encoding the image with the text data. You can then share the image " +
          "with other people and they can decode the image (retrieve the original message) using this app.",
        title: "What is steganography?"
      },
      "",
      false
    );

    expect(renderHeader).toMatchSnapshot();
  });
});
