import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Steganography extends Component {
  static propTypes = {
    webview: PropTypes.shape({
      webview: PropTypes.func.isRequired,
    }).isRequired,
  };

  convertMessageToUnicode(message) {
    const unicodeMessage = [];
    message.forEach((character) => {
      const unicode = character.codePointAt(0);
      unicodeMessage.push(unicode);
    });

    return unicodeMessage;
  }

  convertUnicodeToMessage(unicodeList) {
    let stringMessage = '';
    unicodeList.forEach((unicode) => {
      stringMessage += String.fromCodePoint(unicode);
    });

    return stringMessage;
  }

  getPixelData() {
    this.webview.postMessage(JSON.stringify({ name: 'getPixelData', args: '' }));
  }

  setPixelData(pixelData) {
    this.webview.postMessage(JSON.stringify({ name: 'setPixelData', args: pixelData }));
  }
}
