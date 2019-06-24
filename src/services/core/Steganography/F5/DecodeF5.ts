import generator from "random-seed";
import varint from "varint";

import { convertImageDataToDCT } from "../JSTEG";

export default class DecodeF5 {
  /** The DCT limit used for decoding, the higher the limit the more resistant to compression. */
  private readonly limit: number;
  /** The password used to seed the RNG. */
  private readonly password: string;
  /** The maximum index of the bit we can decode. */
  private maximumIndex: number;
  /** The random number generator. Which is seeded using the password,
   * determines the next bit to encode.
   */
  private rng: generator.RandomSeed;
  /** The bits have currently been decoded. */
  private decodedBits: number[];

  constructor(limit = 15, password: string) {
    this.limit = limit;
    this.password = password;
    this.maximumIndex = 0;
    this.rng = generator.create();
    this.decodedBits = [];
  }

  /**
   * Decodes data from image data.
   *
   * * Convert image into it's DCT coefficients
   * * Using password we seed a RNG
   * * Get message length
   *    * We use the RNG to determine which coefficient to decode
   * * Use message length to determine how many bytes we have left to decode
   *    * We use the RNG to determine which coefficient to decode
   *
   * **Note:** We don't decode any DCT coefficients which are 0.
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
   * @return The decoded message.
   */
  public decode = (
    imageData: Uint8ClampedArray,
    width: number,
    height: number
  ) => {
    const dctData = convertImageDataToDCT(imageData, width, height);
    this.maximumIndex = dctData.length;
    this.rng = generator.create(this.password);
    const messageLength = this.getMessageLength(dctData);
    const binaryMessage: string[] = [];

    for (let i = 0; i < messageLength; i++) {
      const byte = this.getNextByte(dctData);
      binaryMessage.push(byte);
    }
    return binaryMessage;
  };

  /**
   * Decodes the message length from the image, so we know how long the message is and when we should
   * stop decoding. Decode the data using varint.
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
   * Decodes the next byte (8 bits) from the image. We use the RNG we seeded earlier,
   * to determine what is the next bit to decode. We keep track of all the bits we've
   * decoded so we don't decode the same bit again (like when we were encoding). Also
   * we don't decode any 0 coefficients as per the algorithms definitions (we also don't
   * encode any coefficients which are 0).
   *
   * @param dctData: The DCT coefficients (for all pixels).
   *
   * @return The decoded (next) byte from the image.
   */
  private getNextByte = (dctData: number[][][]) => {
    let byte = "";
    let randomBit;
    let data;

    for (let i = 0; i < 8; i += 2) {
      do {
        randomBit = this.rng(this.maximumIndex);
      } while (this.decodedBits.includes(randomBit));

      data = dctData[randomBit][0];

      byte += this.getBits(data);
      this.decodedBits.push(randomBit);
    }

    return byte;
  };

  /**
   * Gets the encoded bit from the data. Two bits are encoded per every three
   * DCT Coefficients (for each pixel). Since they are encoded using matrix encoding.
   * You can decode by getting the LSB of all three then XOR, 1st and 3rd element and
   * 2nd and 3rd element to get the two bits.
   *
   * Example::
   *
   * DCT Coefficients: `[105 15 90]`
   * LSB: `[105/15 % 2, 15/15 % 2, 90 % 2] = [1 0 0]`
   * x1 = `0 XOR 1 = 1`
   * x2 = `0 XOR 0 = 0`
   *
   * So we decoded bits are `10`.
   *
   * @param data: The DCT coefficient to decode (retrieve LSB from).
   *
   * @return The encoded bits from the data (binary).
   */
  private getBits = (data: number[]) => {
    const limitedData = data.map(num => {
      return Math.floor(num / this.limit) % 2;
    });

    const x1 = limitedData[0] === limitedData[2] ? "0" : "1";
    const x2 = limitedData[1] === limitedData[2] ? "0" : "1";
    const bits = x1 + x2;

    return bits;
  };
}
