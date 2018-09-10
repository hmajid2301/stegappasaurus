import { DCT } from '../DCT';
import { EncodeLSB } from '../LSB/EncodeLSB';


export default class EncodeLDCT {
  encode(imageData, message) {
    const dct = DCT();
    const dctData = dct.DCT1D(imageData);
    const newPixelData = EncodeLSB.encode(dctData, message);
    const iNewPixelData = dct.IDCT1D(newPixelData);
    return iNewPixelData;
  }
}

