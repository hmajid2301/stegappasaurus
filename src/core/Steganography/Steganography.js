import PropTypes from 'prop-types';

export default class Steganography {
  static propTypes = {
    webview: PropTypes.shape({
      webview: PropTypes.func.isRequired,
    }).isRequired,
  };

  static getSeparator() {
    return '1101100010100111';
  }

  convertMessageToBinary(message) {
    const unicodeMessage = [];
    const messageLength = message.length;
    const messageSizeBinary = messageLength.toString(2);

    unicodeMessage.push(messageSizeBinary);
    unicodeMessage.push(this.getSeparator());

    message.forEach((character) => {
      const unicode = character.codePointAt(0);
      let binaryValue = unicode.toString(2);
      if (binaryValue.length < 8) {
        const padLength = 8 - (binaryValue.length - 1);
        binaryValue = binaryValue.padStart(padLength, '0');
      }

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
