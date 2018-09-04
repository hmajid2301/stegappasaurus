import PropTypes from 'prop-types';

import { DCT } from '../DCT';
import { EncodeLSB } from '../LSB/EncodeLSB';


export default class EncodeLDCT {
  static propTypes = {
    message: PropTypes.shape({
      message: PropTypes.func.isRequired,
    }).isRequired,

    imageData: PropTypes.shape({
      imageData: PropTypes.func.isRequired,
    }).isRequired,
  };

  encode() {
    const dct = DCT();
    const dctData = dct.DCT1D(this.imageData);
    const encodeLSB = EncodeLSB(this.message, dctData);
    const newPixelData = encodeLSB.encode();
    const iNewPixelData = dct.IDCT1D(newPixelData);
    return iNewPixelData;
  }
}

