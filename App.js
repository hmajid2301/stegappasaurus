import { Font, AppLoading } from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import MyApp from './src/Routes';


const robotoThin = require('./src/assets/fonts/Roboto-Thin.ttf');
const robotoLight = require('./src/assets/fonts/Roboto-Light.ttf');
const robotoRegular = require('./src/assets/fonts/Roboto-Regular.ttf');


export default class App extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      RobotoThin: robotoThin,
      RobotoLight: robotoLight,
      RobotoRegular: robotoRegular,
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}
