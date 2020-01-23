import {MessageTooLongError} from '~/actions/Steganography/exceptions';

export default class EncodeLSB {
  private action: () => void;

  constructor(action?: () => void) {
    if (action !== undefined) {
      this.action = action;
    } else {
      this.action = () => null;
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

    const newImageData = imageData;
    for (const bit of binaryMessage) {
      const imageDataByte = imageData[encodeIndex];
      const newPixelValue = this.encodeImageDataByte(imageDataByte, bit);

      newImageData[encodeIndex] = newPixelValue;
      encodeIndex += 1;
      this.action();
    }
    return newImageData;
  }

  public encodeImageDataByte(pixelValue: number, bit: string) {
    let newImageDataValue = pixelValue;
    const bitToEncode = pixelValue % 2;

    if (bit === '0' && bitToEncode === 1) {
      newImageDataValue -= 1;
    } else if (bit === '1' && bitToEncode === 0) {
      newImageDataValue += 1;
    }
    return newImageDataValue;
  }
}
