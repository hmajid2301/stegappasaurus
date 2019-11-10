import {AppRegistry} from 'react-native';
import React from 'react';

import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider} from '~/providers/ThemeContext';

const MainApp = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

AppRegistry.registerComponent(appName, () => MainApp);
