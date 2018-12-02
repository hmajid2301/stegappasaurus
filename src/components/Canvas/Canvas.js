import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../Common/styles';
import index from './html/index';


export default class Canvas extends Component {
  constructor() {
    super();

    this.state = {
      canvas_result: { function_called: null, function_result: null },
    };
  }

  static propTypes = {
    blob: PropTypes.string.isRequired,
    sendData: PropTypes.func.isRequired,
    options: PropTypes.shape({
      imageHeight: PropTypes.number,
      imageWidth: PropTypes.number,
    }).isRequired,
  };


  sendToParent = () => {
    this.props.sendData(this.state.canvas_result);
  }

  handleDataReceived = (msgData) => {
    this.setState({
      canvas_result: {
        last_function_called: msgData.name,
        function_result: msgData.data,
      },
    }, this.sendToParent);
  }

  onWebViewMessage = (event) => {
    const msgData = JSON.parse(event.nativeEvent.data);
    this[msgData.targetFunc].apply(this, [msgData]);
  }

  getPixelData = () => {
    this.webview.postMessage(JSON.stringify({ name: 'getPixelData', args: '' }));
  }

  setPixelData = (pixelData) => {
    this.webview.postMessage(JSON.stringify({ name: 'setPixelData', args: pixelData }));
  }

  render() {
    const { blob, options, ...props } = this.props;
    const html = index(blob, options);
    return (
      <View {...props} style={styles.showCanvas}>
        <WebView
          ref={(view) => { this.webview = view; }}
          source={{ html }}
          onMessage={this.onWebViewMessage}
        />
      </View>
    );
  }
}

