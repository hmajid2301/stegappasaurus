import React, { Component } from 'react';
import { View } from 'react-native';
import Expo from 'expo';
import CustomHeader from './src/components/CustomHeader';

const robotoThinPath = require('./assets/fonts/Roboto-Thin.ttf');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'roboto-thin': robotoThinPath,
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View>
        <CustomHeader />
      </View>
    );
  }
}
