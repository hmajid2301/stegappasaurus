import PropTypes from 'prop-types';
import Steganography from '../Steganography';


export default class DecodeLSB {
  static propTypes = {
    imageData: PropTypes.shape({
      imageData: PropTypes.func.isRequired,
    }).isRequired,
  };

  decode() {
    const steg = Steganography('');
    const sep = steg.getSeparator();
    const pixelData = steg.getPixelData();
    const binaryMessage = this.decodeData(pixelData, sep);
    const message = steg.convertUnicodeToMessage(binaryMessage);
    return message;
  }

  decodeData(pixelData, sep) {
    const messageLength = this.getMessageLength(pixelData, sep);
    let pixelIndex = messageLength.toString(2).length + sep.length;
    let binaryCharacterList = [];

    for (let i = 0; i < messageLength; i += 1) {
      let binaryCharacter = '';
      for (let j = 0; j < 8; j += 1) {
        binaryCharacter += this.getCurrentPixelLSB(pixelData, pixelIndex);

        pixelIndex += 1;
        if (pixelIndex % 4 === 0) {
          pixelIndex += 1;
        }
      }
      binaryCharacterList += binaryCharacter;
    }
    return binaryCharacterList;
  }

  getMessageLength(pixelData, sep) {
    let completed = false;
    let binaryMessageLength = '';
    let pixelIndex = 0;

    while (!completed) {
      const lsb = this.getCurrentPixelLSB(pixelData, pixelIndex);
      binaryMessageLength += lsb;

      if (binaryMessageLength.includes(sep)) {
        binaryMessageLength = binaryMessageLength.replace(sep, '');
        completed = true;
      }

      pixelIndex += 1;
      if (pixelIndex % 4 === 0) {
        pixelIndex += 1;
      }
    }

    const messageLength = parseInt(binaryMessageLength, 2);
    return messageLength;
  }

  getCurrentPixelLSB(pixelData, pixelIndex) {
    const currentPixel = pixelData[pixelIndex];
    let lsb = '0';
    if (currentPixel % 2 === 1) {
      lsb = '1';
    }

    return lsb;
  }
}

