import {MessageTooLongError} from '~/actions/Steganography/exceptions';

export default class EncodeLSB {
  private action: () => void;

  constructor(action?: () => void) {
    if (action !== undefined) {
      this.action = action;
    } else {
      this.action = () => {
        return;
      };
    }
  }

  public encode(imageData: number[], binaryMessage: string, encodeIndex = 0) {
    if (imageData.length < binaryMessage.length) {
      throw new MessageTooLongError(
        'Message too long to encode.',
        binaryMessage.length,
        imageData.length,
      );
    }

    const newPixelData = imageData;
    for (const bit of binaryMessage) {
      const pixelValue = imageData[encodeIndex];
      const newPixelValue = this.getNewPixelValue(pixelValue, bit);

      newPixelData[encodeIndex] = newPixelValue;
      encodeIndex += 1;
      this.action();
    }
    return newPixelData;
  }

  public getNewPixelValue(pixelValue: number, bit: string) {
    let newPixelValue = pixelValue;
    const bitToEncode = pixelValue % 2;

    if (bit === '0' && bitToEncode === 1) {
      newPixelValue -= 1;
    } else if (bit === '1' && bitToEncode === 0) {
      newPixelValue += 1;
    }
    return newPixelValue;
  }
}
