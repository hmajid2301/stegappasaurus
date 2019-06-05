import varint from "varint";

import { convertImageDataToDCT } from "./DCT";

export default class DecodeDCT {
  /** The current index to get the next bit from to decode. */
  private dctIndex = 0;
  /** The DCT limit used for decoding, the higher the limit the more resistant to compression. */
  private readonly limit: number;

  constructor(limit = 15) {
    this.limit = limit;
  }

  /**
   * Decodes data from image data.
   *
   * * Convert image into it's DCT coefficients
   * * Decode LSB for each component (first first elements)
   * * Get message length
   * * Decode actual secret message
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @param width: The width of the image, in pixels.
   *
   * @param height: The height of the image, in pixels.
   *
   * @param startByte: Byte to start encoding at.
   *
   * @return The decoded message.
   */
  public decode = (
    imageData: Uint8ClampedArray,
    width: number,
    height: number,
    startByte = 0
  ) => {
    this.dctIndex = startByte * 8 + startByte * 2;
    const dctData = convertImageDataToDCT(imageData, width, height);
    const messageLength = this.getMessageLength(dctData);
    const binaryMessage: string[] = [];

    for (let i = 0; i < messageLength; i++) {
      const byte = this.getNextByte(dctData);
      binaryMessage.push(byte);
    }
    return binaryMessage;
  };

  /**
   * Decodes the message length from the image, so we know how long
   * the message is and when we should stop decoding. Decode the data using
   * varint.
   *
   * @param dctData: The DCT coefficients (for all pixels).
   *
   * @return The message length in decimal.
   */
  private getMessageLength = (data: number[][][]) => {
    let completed = false;
    const messageVarint: number[] = [];

    while (!completed) {
      const byte = this.getNextByte(data);
      const num = parseInt(byte, 2);
      messageVarint.push(num);
      if (messageVarint.slice(-1)[0] < 128) {
        completed = true;
      }
    }

    const messageLength = varint.decode(messageVarint);
    return messageLength;
  };

  /**
   * Decodes the next byte (8 bits) from the image.
   *
   * @param dctData: The DCT coefficients (for all pixels).
   *
   * @return Decodes the next byte from the image.
   */
  private getNextByte = (data: number[][][]) => {
    let byte = "";
    for (let i = 0; i < 8; i += 1) {
      const index = Math.floor(this.dctIndex / 3);
      const component = this.dctIndex % 3;

      const current = data[index][0][component];
      const bit = this.getBitValue(current);
      this.dctIndex += 1;
      byte += bit;
    }

    return byte;
  };

  /**
   * Gets the encoded bit from the data. Either "0" or "1".
   *
   * @param data: The DCT coefficient to get the LSB from.
   *
   * @return The encoded bit from the data ("0" or "1").
   */
  private getBitValue = (data: number) => {
    const value = Math.round(data / this.limit);
    let bitValue = "0";
    if (value % 2 === 1) {
      bitValue = "1";
    }

    return bitValue;
  };
}
