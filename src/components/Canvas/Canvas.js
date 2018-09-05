import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import PropTypes from 'prop-types';

import renderHTML from './CanvasHTML';


export default class Canvas extends Component {
  static propTypes = {
    blob: PropTypes.shape({
      blob: PropTypes.func.isRequired,
    }).isRequired,

    options: PropTypes.shape({
      imageHeight: PropTypes.number,
      imageWidth: PropTypes.number,
    }).isRequired,
  };

  static onMessage(data) {
    return data.nativeEvent.data;
  }

  getWebView() {
    return this.webview;
  }

  render() {
    const { blob, options, ...props } = this.props;
    const html = renderHTML(blob, options);
    return (
      <View {...props}>
        <WebView
          ref={(view) => { this.webview = view; }}
          source={{ html }}
          onMessage={this.onMessage}
        />
      </View>
    );
  }
}

