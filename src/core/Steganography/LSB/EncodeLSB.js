import PropTypes from 'prop-types';
import Steganography from '../Steganography';


export default class EncodeLSB {
  static propTypes = {
    message: PropTypes.shape({
      message: PropTypes.func.isRequired,
    }).isRequired,

    imageData: PropTypes.shape({
      imageData: PropTypes.func.isRequired,
    }).isRequired,
  };

  encode() {
    const steg = Steganography('');
    const binaryMessage = steg.convertMessageToBinary(this.message);
    const pixelData = steg.getPixelData();
    const newPixelData = this.encodeData(pixelData, binaryMessage);
    return newPixelData;
  }

  encodeData(pixelData, binaryMessage) {
    const newPixelData = [];
    let pixelIndex = 0;

    binaryMessage.forEach((character) => {
      character.forEach((binaryValue) => {
        const pixelValue = pixelData[pixelIndex];
        const newPixelValue = this.getNewPixelValue(pixelValue, binaryValue);
        newPixelData[pixelIndex] = newPixelValue;

        pixelIndex += 1;
        if (pixelIndex % 4 === 0) {
          pixelIndex += 1;
        }
      });
    });
    return newPixelData;
  }

  getNewPixelValue(pixelValue, messageValue) {
    let newPixelValue = pixelValue;

    if (messageValue === '0') {
      if (pixelValue % 2 === 1) {
        newPixelValue += 1;
      }
    } else if (messageValue === '1') {
      if (pixelValue % 2 === 0) {
        newPixelValue -= 1;
      }
    }

    return newPixelValue;
  }
}

