import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import PropTypes from 'prop-types';

import renderHTML from './CanvasHTML';
import styles from '../Common/styles';


export default class Canvas extends Component {
  constructor() {
    super();

    this.state = {
      last_function_called: null,
      function_result: null,
    };
  }

  static propTypes = {
    blob: PropTypes.shape({
      blob: PropTypes.string,
    }).isRequired,

    options: PropTypes.shape({
      imageHeight: PropTypes.number,
      imageWidth: PropTypes.number,
    }).isRequired,
  };

  onMessage = (data) => {
    const jsonResponse = JSON.parse(data.nativeEvent.data);
    this.setState({ function_result: jsonResponse.data });
    this.setState({
      function_result: jsonResponse.data,
    }, () => {
      console.log(this.state.function_result);
    });
  }

  getPixelData = () => {
    this.setState({ last_function_called: 'getPixelData', function_result: null });
    this.webview.postMessage(JSON.stringify({ name: 'getPixelData', args: '' }));
  }

  setPixelData = (pixelData) => {
    this.setState({ last_function_called: 'setPixelData', function_result: null });
    this.webview.postMessage(JSON.stringify({ name: 'setPixelData', args: pixelData }));
  }

  render() {
    const { blob, options, ...props } = this.props;
    const html = renderHTML(blob, options);
    return (
      <View {...props} style={styles.showCanvas}>
        <WebView
          ref={(view) => { this.webview = view; }}
          source={{ html }}
          onMessage={this.onMessage}
        />
      </View>
    );
  }
}

