import { AppRegistry } from "react-native";

import App from "./App";
import { name as appName } from "./app.json";
import { ThemeContext } from "~/providers/ThemeContext";

const MainApp = () => {
  <ThemeContext>
    <App />
  </ThemeContext>;
};

AppRegistry.registerComponent(appName, () => MainApp);
