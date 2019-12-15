import {AppRegistry} from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import React from 'react';

import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider} from '~/providers/ThemeContext';

const MainApp = () => (
  <AppearanceProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AppearanceProvider>

);

AppRegistry.registerComponent(appName, () => MainApp);
