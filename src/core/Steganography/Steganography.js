import PropTypes from 'prop-types';

import { EncodeLSB, DecodeLSB } from './LSB';
import { EncodeLDCT, DecodeLDCT } from './LDCT';


export default class Steganography {
  static propTypes = {
    webview: PropTypes.shape({
      webview: PropTypes.func.isRequired,
    }).isRequired,

    algorithm: PropTypes.shape({
      algorithm: PropTypes.func.isRequired,
    }).isRequired,
  };

  static getSeparator() {
    return '1101100010100111';
  }

  static convertMessageToBinary(message) {
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

  static convertUnicodeToMessage(unicodeList) {
    let stringMessage = '';
    unicodeList.forEach((unicode) => {
      stringMessage += String.fromCodePoint(unicode);
    });

    return stringMessage;
  }

  static getAlgorithm(encoding) {
    let algorithm = '';

    if (this.algorithm === 'LSB') {
      if (encoding) {
        algorithm = EncodeLSB();
      } else {
        algorithm = DecodeLSB();
      }
    }

    if (this.algorithm === 'LDCT') {
      if (encoding) {
        algorithm = EncodeLDCT();
      } else {
        algorithm = DecodeLDCT();
      }
    }

    return algorithm;
  }

  encode() {
    const algorithm = this.algorithm(true);
    const binaryMessage = this.convertMessageToBinary(this.message);
    const pixelData = this.getPixelData();
    const newPixelData = algorithm.encode(pixelData, binaryMessage);
    const newImage = this.setPixelData(newPixelData);
    return newImage;
  }

  decode() {
    const algorithm = this.algorithm(false);
    const pixelData = this.getPixelData();
    const unicode = algorithm.decode(pixelData, this.getSeparator);
    const message = this.convertUnicodeToMessage(unicode);
    return message;
  }
}
