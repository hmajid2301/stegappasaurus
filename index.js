import {AppRegistry} from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import React from 'react';

import Share from '~/actions/Share/Share';
import {ThemeProvider} from '~/providers/ThemeContext';
import App from './App';
import {name as appName} from './app.json';

const MainApp = () => (
  <AppearanceProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AppearanceProvider>
);

AppRegistry.registerComponent(appName, () => MainApp);
AppRegistry.registerComponent('Share', () => Share);
