export default class EncodeLSB {
  /**
   * Acts a main function encodes binary message into the LSB of image data. **Note**: alpha channel
   * is set to 255 as it can cause issues. So only Red Green Blue (RGB) channels are actually used
   * to encode data within.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @param binaryMessage: The message to encode, in binary (0 or 1).
   *
   * @param startEncodingAt: Index to start encoding at.
   *
   * @return The encoded image data array.
   */
  public encode = (
    imageData: Uint8ClampedArray,
    binaryMessage: string,
    startEncodingAt = 0
  ) => {
    const newPixelData = imageData;

    let pixelIndex = startEncodingAt;
    for (const bit of binaryMessage) {
      const pixelValue = imageData[pixelIndex];
      const newPixelValue = this.getNewPixelValue(pixelValue, bit);
      newPixelData[pixelIndex] = newPixelValue;

      pixelIndex += 1;
      if ((pixelIndex + 1) % 4 === 0) {
        pixelIndex += 1;
      }
    }
    return newPixelData;
  };

  /**
   * Gets new pixel data value, given a byte to encode and a bit to encode it with.
   *
   * @param pixelValue: The pixel value as a decimal integer (0 - 255).
   *
   * @return The encoded pixel value.
   */
  public getNewPixelValue = (pixelValue: number, bit: string) => {
    let newPixelValue = pixelValue;

    if (bit === "0" && pixelValue % 2 === 1) {
      newPixelValue -= 1;
    } else if (bit === "1" && pixelValue % 2 === 0) {
      newPixelValue += 1;
    }
    return newPixelValue;
  };
}
