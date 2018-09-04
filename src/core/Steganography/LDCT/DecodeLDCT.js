import PropTypes from 'prop-types';

import DCT from '../DCT';
import { DecodeLSB } from '../LSB/DecodeLSB';


export default class EncodeLDCT {
  static propTypes = {
    imageData: PropTypes.shape({
      imageData: PropTypes.func.isRequired,
    }).isRequired,
  };

  decode() {
    const dct = DCT();
    const dctData = dct.DCT1D(this.imageData);
    const decodeLSB = DecodeLSB(dctData);
    const newPixelData = decodeLSB.encode();
    const iNewPixelData = dct.IDCT1D(newPixelData);
    return iNewPixelData;
  }
}

