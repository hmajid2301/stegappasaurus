import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { DOMWindow, JSDOM } from "jsdom";
// @ts-ignore
import MockAsyncStorage from "mock-async-storage";
import renderer from "react-test-renderer";

const jsdom = new JSDOM();
const { window } = jsdom;

interface Global extends NodeJS.Global {
  window: DOMWindow;
  document: Document;
  navigator: {
    userAgent: string;
  };
}

const globalNode: Global = {
  window: window,
  document: window.document,
  navigator: {
    userAgent: "node.js"
  },
  ...global
};

const copyProps = (src: DOMWindow, target: Global) => {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
};
copyProps(window, globalNode);

const realConsoleError = console.error;
console.error = (message: string) => {
  if (message.match("Warning:")) {
    return;
  }
  realConsoleError(message);
};

jest.mock(
  "@react-native-community/async-storage",
  () => new MockAsyncStorage()
);

Enzyme.configure({ adapter: new Adapter() });
