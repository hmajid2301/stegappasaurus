import { Timber } from "@timberio/node";
import Config from "react-native-config";

const logger = new Timber(Config.TIMBER_API_KEY, Config.TIMBER_SOURCE_ID);

export default logger;
