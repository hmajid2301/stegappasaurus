/**
 * This class implements using the following steganography algorithm.
 *
 * input:
 * * Image Data (array)
 * * Message (byte string array)
 *
 * Output:
 *
 * * Image Data (array)
 *
 * ```python
 * function encode(imageData, message):
 *   var data_to_encode = [padded_length] + message
 *
 *   var imageIndex = 0
 *   for data in data_to_encode:
 *       imageData[imageIndex] = get_new_pixel_data(imageData, data, imageIndex)
 *       imageIndex += 1
 *
 *   return imageData
 * ```
 *
 */
export default class EncodeLSB {
  /**
   * Acts a main function encodes binary message into the LSB of image data. **Note**: alpha channel
   * is set to 255 as it can cause issues. So only Red Green Blue (RGB) channels are actually used
   * to encode data within.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`
   *
   * @param binaryMessage: The message to encode, where each element is a character in the message
   * in unicode.
   *
   * @return The encoded image data array.
   */
  public encode = (imageData: Uint8ClampedArray, binaryMessage: string[]) => {
    const newPixelData = imageData;

    let pixelIndex = 0;
    for (const character of binaryMessage) {
      for (const bit of character) {
        const pixelValue = imageData[pixelIndex];
        const newPixelValue = this.getNewPixelValue(pixelValue, bit);
        newPixelData[pixelIndex] = newPixelValue;

        pixelIndex += 1;
        if ((pixelIndex + 1) % 4 === 0) {
          pixelIndex += 1;
        }
      }
    }
    return newPixelData;
  };

  /**
   * Embeds the current binary "digit" into the LSB of the current imageData. For example if binary
   * value is `1` and the pixel value is `255` since it's odd the LSB is already `1` so we don't
   * need to change it. However if pixel value was `254` then since `254` is even in binary it
   * must end in an `0` so we must increment this by one.
   *
   * @param pixelValue: A decimal value of a RGB pixel (0 - 255).
   *
   * @param messageBinaryDigit: The binary "digit" to encode either `1` or `0`.
   *
   * @return The encoded pixel value.
   */
  private getNewPixelValue = (
    pixelValue: number,
    messageBinaryDigit: string
  ) => {
    let newPixelValue = pixelValue;

    if (messageBinaryDigit === "0") {
      if (pixelValue % 2 === 1) {
        newPixelValue -= 1;
      }
    } else if (messageBinaryDigit === "1") {
      if (pixelValue % 2 === 0) {
        newPixelValue += 1;
      }
    }
    return newPixelValue;
  };
}
