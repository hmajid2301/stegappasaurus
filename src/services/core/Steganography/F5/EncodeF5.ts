import generator from "random-seed";

import { convertDCTToImageData, convertImageDataToDCT } from "../JSTEG";

export default class EncodeF5 {
  /** The DCT limit used for encoding, the higher the limit the more resistant to compression. */
  private readonly limit: number;
  /** The password used to seed the RNG. */
  private readonly password: string;
  /** The bits have currently been encoded. */
  private encodedBits: number[];

  constructor(limit = 15, password: string) {
    this.limit = limit;
    this.password = password;
    this.encodedBits = [];
  }

  /**
   * Encodes a message (data) into image data.
   *
   * * Convert an image into it's DCT coefficients
   * * Using a password seed an RNG, use this to generate the next pixel to encode
   * * Use LSB to encode that DCT coefficient
   *
   * **Note:** We don't encode any DCT coefficients which are 0.
   *
   * **Note:** If the coefficient > 0 use LSB if < 0 use reverse LSB.
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
    const dctData = convertImageDataToDCT(imageData, width, height);
    const encodedDCTData = this.encodeF5(dctData, binaryMessage);
    const newImageData = convertDCTToImageData(encodedDCTData, width, height);
    return new Uint8ClampedArray([
      ...imageData.subarray(0, startEncodingAt),
      ...newImageData.subarray(startEncodingAt)
    ]);
  };

  /**
   * Encodes the binary message (bit by bit) into the DCT coefficients. We use the password
   * to seed a RNG, which determines the next bit to encode. We encode the image "randomly",
   * not left to right, top to bottom like other algorithms. We keep track of all the encoded
   * bits so that we don't encode the same bit twice by accident. We also don't encode any DCT
   * coefficients which are 0 (as per the algorithm definition).
   *
   * @param dctData: The DCT coefficients (for all pixels).
   *
   * @param binaryMessage: The message to encode, in binary (0 or 1).
   *
   * @return The encoded DCT coefficients array.
   */
  private encodeF5 = (dctData: number[][][], binaryMessage: string) => {
    const rng = generator.create(this.password);
    const maxRandRange = dctData.length * 3;

    for (const bit of binaryMessage) {
      let randomBit;
      let index;
      let component;
      let data;

      do {
        do {
          randomBit = rng(maxRandRange);
        } while (this.encodedBits.includes(randomBit));

        index = Math.floor(randomBit / 3);
        component = randomBit % 3;
        data = dctData[index][0][component];
      } while (data === 0);

      const pixelData = this.getNewPixelData(data, bit);
      dctData[index][0][component] = pixelData;
      this.encodedBits.push(randomBit);
    }

    return dctData;
  };

  /**
   * Encodes a bit into a DCT coefficient, using the limit. The higher the limit the more resilient
   * the image will be to compression however the more compressed the image will look.
   *
   * If DCT Coefficient > 0 then we use normal LSB to encode the coefficient. Else if it's < 0
   * then we use reverse LSB, again as per the algorithm definition.
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

    if (data >= 0) {
      if (bit === "1" && tmp % 2 === 0) {
        newValue += this.limit;
      } else if (bit === "0" && tmp % 2 === 1) {
        newValue -= this.limit;
      }
    } else {
      if (bit === "1" && tmp % 2 === 0) {
        newValue -= this.limit;
      } else if (bit === "0" && tmp % 2 === 1) {
        newValue += this.limit;
      }
    }

    return newValue;
  };
}
