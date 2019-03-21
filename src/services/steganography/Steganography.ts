import { AlgorithmNames } from "~/util/interfaces";
import { DecodeLSB, EncodeLSB } from "./LSB";

/**
 * This class chooses what algorithm to use. Calls the correct functions to encode/decode data.
 * It's main job is to do the common functions required by all steganography algorithm.
 *
 * ## Encoding
 *
 * First we need to get the image data, `canvas.getImageData()` (to encode).
 *
 * Then we need to given an input say `"A 😀"`, we need to convert this first into unicode this would become
 * `"\u0041\u0020\uD83D\uDE00"`. This then gets converted into binary ascii. So `\` into ascii
 * binary is (padded to byte) is `01011100`, We pass a string to binary digits to get encoded.
 *
 * After this we call our encoding algorithm, get the new data. Then we change the image data ().
 * Finally this function returns base64 string of the image which we return to user.
 *
 * ## Decoding
 *
 * First we need to get the image data, `canvas.getImageData()` (to decode). Then we take the
 * returns string which is ascii binary (`01011100` = `\`).
 *
 * We then decode this binary ascii into a string which will look like so
 * `"\u0041\u0020\uD83D\uDE00"`, this is a unicode string. So to get back our original message we
 * then convert this from unicode into a normal string.
 */
export default class Steganography {
  private readonly algorithm: AlgorithmNames;
  /** The algorithm to use to encode/decode i.e. LSB. */
  private readonly pixelData: number[];
  /** Image pixel data as an array from 0 - 255 and in the form `RGBA`. */

  constructor(algorithm: AlgorithmNames, pixelData: number[]) {
    this.algorithm = algorithm;
    this.pixelData = pixelData;
  }

  /**
   * Encodes a string (message) into an image using steganography algorithms.
   *
   * @param message: The message to encode as a string.
   *
   * @return The encoded image as base64 string.
   */
  public encode = (message: string) => {
    const binaryMessage = this.convertMessageToBinary(message);
    const newPixelData = this.encodeData(this.pixelData, binaryMessage);
    return newPixelData;
  };

  /**
   * Decodes an image to get an encoded message.
   *
   * @return The decoded message.
   */
  public decode = () => {
    let message = "";
    try {
      const unicode = this.decodeData(this.pixelData);
      message = this.convertBinaryToMessage(unicode);
    } catch (e) {
      if (e instanceof RangeError) {
        message = "Invalid image, cannot decode.";
      }
    }

    return message;
  };

  /**
   * Converts a message into binary, first converts the message into a unicode string. Then
   * converts that unicode string into a binary ascii string.
   *
   * @param message: The message to encode as a string.
   *
   * @return A binary string (each character is a byte).
   */
  private convertMessageToBinary = (message: string) => {
    const unicodeBinaryMessage = [];

    for (const character of message) {
      const codePoint = character.codePointAt(0) || 0;
      const encodingType = codePoint > 128 ? "\\u" : "\\x";
      const unicode = encodingType + codePoint.toString(16);
      for (const c of unicode) {
        const binaryValue = this.convertToBinary(c.codePointAt(0) || 0);
        unicodeBinaryMessage.push(binaryValue);
      }
    }

    if (unicodeBinaryMessage.length !== 0) {
      const paddedMessageLength = this.convertToBinary(
        unicodeBinaryMessage.length
      );
      unicodeBinaryMessage.unshift(paddedMessageLength);
    }

    return unicodeBinaryMessage;
  };

  /**
   * Pads data to the nearest byte for example if data = 4 then this function will return
   * "00000100".
   *
   * @param data: Integer value to convert to string
   *
   * @return The padded binary data.
   */
  private convertToBinary(data: number) {
    const binary = data.toString(2);
    const nearestByteLength = Math.ceil(binary.length / 8) * 8;
    const paddedData = binary.padStart(nearestByteLength, "0");
    return paddedData;
  }

  /**
   * Converts ascii binary decoded from image back into original unicode. First converts binary
   * ascii into a unicode string. Then the unicode string back into original unicode message.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @return The encoded message as a string.
   */
  private convertBinaryToMessage = (binaryMessage: string[]) => {
    let unicodeString = "";
    binaryMessage.forEach(currentByte => {
      unicodeString += String.fromCodePoint(parseInt(currentByte, 2));
    });

    const message = unicodeString.normalize();
    return message;
  };

  /**
   * Encodes the data based on the select algorithm.
   *
   * @param pixelData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`
   *
   * @param binaryMessage: The message to encode, where each element is a character in the message
   * in unicode.
   *
   * @return The encoded image data.
   */
  private encodeData = (pixelData: number[], binaryMessage: string[]) => {
    let encodedData;

    switch (this.algorithm) {
      default:
        encodedData = new EncodeLSB().encode(pixelData, binaryMessage);
    }

    return encodedData;
  };

  /**
   * Decodes the hidden message, based on the select algorithm.
   *
   * @param pixelData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`
   *
   * @return The decoded message.
   */
  private decodeData = (pixelData: number[]) => {
    let decodedMessage;

    switch (this.algorithm) {
      default:
        decodedMessage = new DecodeLSB().decode(pixelData);
    }

    return decodedMessage;
  };
}
