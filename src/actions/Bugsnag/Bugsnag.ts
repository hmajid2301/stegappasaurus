import { Client, Configuration } from "bugsnag-react-native";
import Config from "react-native-config";

import PackageJson from "../../../package.json";

const config = new Configuration(Config.BUGSNAG_API_KEY);
config.appVersion = PackageJson.version;
const bugsnag = new Client(config);

export default bugsnag;
