import { convertDCTToImageData, convertImageDataToDCT } from "./DCT";

export default class EncodeJSTEG {
  /** The current index to get the next bit from to encode. */
  private dctIndex: number;
  /** The DCT limit used for encoding, the higher the limit the more resistant to compression. */
  private readonly limit: number;

  constructor(limit = 15) {
    this.limit = limit;
    this.dctIndex = 0;
  }

  /**
   * Encodes a message (data) into image data.
   *
   * * Convert an image into it's DCT coefficients
   * * Encode LSB for each component (first DCT Coefficient)
   * * Convert DCT Coefficients (for each pixel) into image data
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @param width: The width of the image, in pixels.
   *
   * @param height: The height of the image, in pixels.
   *
   * @param binaryMessage: The message to encode, in binary (0 or 1).
   *
   * @param startEncodingAt: Index to start encoding at.
   *
   * @return The encoded image data (as a Uint8ClampedArray).
   */
  public encode = (
    imageData: Uint8ClampedArray,
    width: number,
    height: number,
    binaryMessage: string,
    startEncodingAt = 0
  ) => {
    console.time("Start TS");
    this.dctIndex = 0;
    const dctData = convertImageDataToDCT(imageData, width, height);
    const encodedDCTData = this.encodeDCT(dctData, binaryMessage);
    const newImageData = convertDCTToImageData(encodedDCTData, width, height);
    console.timeEnd("Start TS");
    return new Uint8ClampedArray([
      ...imageData.subarray(0, startEncodingAt),
      ...newImageData.subarray(startEncodingAt)
    ]);
  };

  /**
   * Encodes the binary message (bit by bit) into first DCT coefficients (highest frequency).
   * We have three components for each pixel (y, cr, cr), each of these is encoded before we
   * move onto the next pixel.
   *
   * @param dctData: The DCT coefficients (for all pixels).
   *
   * @param binaryMessage: The message to encode, in binary (0 or 1).
   *
   * @return The encoded DCT coefficients array.
   */
  private encodeDCT = (dctData: number[][][], binaryMessage: string) => {
    for (const bit of binaryMessage) {
      const index = Math.floor(this.dctIndex / 3);
      const component = this.dctIndex % 3;

      const pixelData = this.getNewPixelData(dctData[index][0][component], bit);
      dctData[index][0][component] = pixelData;
      this.dctIndex += 1;
    }

    return dctData;
  };

  /**
   * Encodes a bit into a DCT coefficient, using the limit. The higher the limit the more resilient
   * the image will be to compression however the more compressed the image will look.
   *
   * @param data: The data to encode.
   *
   * @param bit: The bit to encode into the coefficient (1 or 0).
   *
   * @return The encoded DCT coefficient.
   */
  private getNewPixelData = (data: number, bit: string) => {
    const tmp = Math.floor(data / this.limit);
    let newValue = tmp * this.limit;

    if (bit === "1" && tmp % 2 === 0) {
      newValue += this.limit;
    } else if (bit === "0" && tmp % 2 === 1) {
      newValue -= this.limit;
    }

    return newValue;
  };
}
