import {Client, Configuration} from 'bugsnag-react-native';
import Config from 'react-native-config';

import meta from '~/../app.json';

const config = new Configuration(Config.BUGSNAG_API_KEY);
config.appVersion = meta.version;
const bugsnag = new Client(config);

export default bugsnag;
