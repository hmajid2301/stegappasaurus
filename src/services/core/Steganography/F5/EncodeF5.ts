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
    const maxRandRange = dctData.length;
    const encodedData = dctData;

    for (let i = 0; i < binaryMessage.length; i += 2) {
      let randomBit;
      let data;

      do {
        randomBit = rng(maxRandRange);
      } while (this.encodedBits.includes(randomBit));
      this.encodedBits.push(randomBit);

      data = encodedData[randomBit][0];
      const bits = binaryMessage.slice(i, i + 2);
      const newData = this.getNewPixelData(data, bits);
      encodedData[randomBit][0] = newData;
    }

    return encodedData;
  };

  /**
   * Encodes a bit into a DCT coefficient, using the limit. The higher the limit the more resilient
   * the image will be to compression however the more compressed the image will look.
   *
   * This uses matrix encoding, we split the image into 3 (LSB) dct coefficients so essentially for
   * each pixel (as each pixel has three components). Matrix encoding we XOR the first and last and
   * the second and last value, so we have two bits. We then try to encode two bits at a time
   *
   * Example:
   *
   * DCT Limit: `15`
   * DCT Coefficients: `[90 0 90]`
   * LSB: `[90/15 % 2, 0/15 % 2, 90/15 % 2]` = `[0 0 0]`
   * x1 = `0 XOR 0 = 0`
   * x2 = `0 XOR 0 = 0`
   *
   * so x1,x2 = "00"
   * Bits to encode: "10"
   *
   * So then we can change LSB to `[1 0 0]`, so we would add the limit,
   * DCT Coefficients: `[105 15 90]`
   *
   *
   * **Note:** http://www.computing.surrey.ac.uk/teaching/2006-07/csm25/Chapter6/jsteg-h.pdf
   *
   * @param data: The data to encode (one pixel), three DCT coefficients.
   *
   * @param bits: The (two) bits to encode.
   *
   * @return The encoded DCT coefficients.
   */
  private getNewPixelData = (data: number[], bits: string) => {
    const lsbData = data.map(num => {
      return "" + (Math.floor(num / this.limit) % 2);
    });

    const x1 = lsbData[0] === lsbData[2] ? "0" : "1";
    const x2 = lsbData[1] === lsbData[2] ? "0" : "1";

    if (x1 !== bits[0]) {
      if (x2 === bits[1]) {
        data[0] = this.encodeBit(data[0], lsbData[0]);
      } else {
        data[2] = this.encodeBit(data[2], lsbData[2]);
      }
    } else if (x2 !== bits[1]) {
      data[1] = this.encodeBit(data[1], lsbData[1]);
    }

    return data;
  };

  /**
   * Encodes the data depending on the bit value (changes LSB). If the (current) bit value is 0
   * then we encode a 1 (by adding the limit). Else if the bit value is 1 then we subtract the
   * limit.
   *
   * @param data: The data to encode.
   *
   * @param bitValue: The bit to encode into the coefficient (1 or 0).
   *
   * @return The encoded data.
   */
  private encodeBit = (data: number, bitValue: string) => {
    if (bitValue === "0") {
      data += this.limit;
    } else {
      data -= this.limit;
    }

    return data;
  };
}
