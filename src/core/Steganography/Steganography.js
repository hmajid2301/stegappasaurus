import PropTypes from 'prop-types';

export default class Steganography {
  static propTypes = {
    webview: PropTypes.shape({
      webview: PropTypes.func.isRequired,
    }).isRequired,
  };

  static getSeparator() {
    return '10100011';
  }

  convertMessageToBinary(message) {
    const unicodeMessage = [];
    const messageSize = message.length;
    const messageSizeBinary = messageSize.toString(2);

    unicodeMessage.push(messageSizeBinary);
    unicodeMessage.push(this.getSeparator());

    message.forEach((character) => {
      const unicode = character.codePointAt(0);
      const binaryValue = unicode.toString(2);
      unicodeMessage.push(binaryValue);
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
