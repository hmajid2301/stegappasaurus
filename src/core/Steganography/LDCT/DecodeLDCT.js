import DCT from '../DCT';
import { DecodeLSB } from '../LSB/DecodeLSB';


export default class EncodeLDCT {
  decode(imageData, separator) {
    const dct = DCT();
    const dctData = dct.DCT1D(imageData);
    const newPixelData = DecodeLSB().decode(dctData, separator);
    const iNewPixelData = dct.IDCT1D(newPixelData);
    return iNewPixelData;
  }
}

