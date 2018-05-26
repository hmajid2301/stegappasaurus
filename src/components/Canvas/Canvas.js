import React, { Component } from 'react';
import { Button, View, WebView } from 'react-native';
import PropTypes from 'prop-types';

import renderHTML from './CanvasHTML';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.getPixelData = this.getPixelData.bind(this);
    this.setPixelData = this.setPixelData.bind(this);
  }
  getPixelData() {
    this.webview.postMessage(JSON.stringify({ name: 'getPixelData', args: '' }));
  }
  setPixelData() {
    this.webview.postMessage(JSON.stringify({ name: 'setPixelData', args: 'hello' }));
  }
  onMessage(data) {
    console.log(data.nativeEvent.data);
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
        <Button onPress={this.getPixelData} title={'Get'} />
        <Button onPress={this.setPixelData} title={'Set'} />
      </View>
    );
  }
}

Canvas.propTypes = {
  blob: PropTypes.shape({
    blob: PropTypes.func.isRequired,
  }).isRequired,
};

Canvas.propTypes = {
  options: PropTypes.shape({
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
  }).isRequired,
};
