import {ImageNotEncodedError} from '~/actions/Steganography/exceptions';

export default class DecodeLSB {
  private pixelIndex: number;
  private action: () => void;

  constructor(action?: () => void) {
    this.pixelIndex = 0;

    if (action !== undefined) {
      this.action = action;
    } else {
      this.action = () => {
        return;
      };
    }
  }

  public decode(imageData: number[], startIndex: number, endIndex: number) {
    this.pixelIndex = startIndex;
    const binaryMessage: string[] = [];

    for (let i = 0; i < endIndex; i += 1) {
      const byte = this.decodeNextByte(imageData);
      binaryMessage.push(byte);
    }
    return binaryMessage;
  }

  public decodeNextByte(imageData: number[]) {
    let byte = '';

    for (let j = 0; j < 8; j += 1) {
      if (this.pixelIndex > imageData.length) {
        throw new ImageNotEncodedError('Image does not seem to be encoded.');
      }
      const currentPixel = imageData[this.pixelIndex];
      let lsb = '0';
      if (currentPixel % 2 === 1) {
        lsb = '1';
      }

      byte += lsb;
      this.pixelIndex += 1;
      this.action();
    }
    return byte;
  }

  public getCurrentIndex() {
    return this.pixelIndex;
  }

  public setCurrentIndex(index: number) {
    this.pixelIndex = index;
  }
}
