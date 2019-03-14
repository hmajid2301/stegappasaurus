import { DecodeLSB, EncodeLSB } from "./LSB";

type Algorithm = "LSB";

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
  private readonly algorithm: Algorithm;
  /** The algorithm to use to encode/decode i.e. LSB. */
  private readonly base64Image: string;
  /** Image as a base64 string */

  constructor(algorithm: Algorithm, base64Image: string) {
    this.algorithm = algorithm;
    this.base64Image = base64Image;
  }

  /**
   * Encodes a string (message) into an image using steganography algorithms.
   *
   * @param message: THe message to encode as a string.
   *
   * @return The encoded image as base64 string.
   */
  public encode = (message: string) => {
    const encodingAlgorithm = this.getAlgorithm(true);
    const binaryMessage = this.convertMessageToBinary(message);
    const pixelData = this.getPixelData();
    const newPixelData = encodingAlgorithm.encode(pixelData, binaryMessage);
    const newImage = this.setPixelData(newPixelData);
    return newImage;
  };

  /**
   * Decodes an image to get an encoded message.
   *
   * @return The decoded message.
   */
  public decode = () => {
    const decodingAlgorithm = this.getAlgorithm(false);
    const pixelData = this.getPixelData();
    try {
      const unicode = decodingAlgorithm.decode(pixelData);
      const message = this.convertBinaryToMessage(unicode);
    } catch (e) {
      if (e instanceof RangeError) {
        const message = "Invalid image, cannot decode.";
      }
    }

    return message;
  };

  /**
   * Converts a message into binary, first converts the message into a unicode string. Then
   * converts that unicode string into a binary ascii string.
   *
   * @param message: THe message to encode as a string.
   *
   * @return A binary string (each character is a byte).
   */
  private convertMessageToBinary = (message: string) => {
    const unicodeMessage = [];
    let messageLengthBinary = message.length.toString(2);
    const messageModulo = messageLengthBinary.length % 8;

    if (messageModulo !== 0) {
      messageLengthBinary = messageLengthBinary.padStart(
        message.length - messageModulo,
        "0"
      );
    }

    unicodeMessage.push(messageLengthBinary);

    for (const character of message) {
      const unicode = "\\u" + (character.codePointAt(0) || 0).toString(16);
      for (const c of unicode) {
        let binaryValue = (c.codePointAt(0) || 0).toString(2);
        if (binaryValue.length < 8) {
          const padLength = 8 - (binaryValue.length - 1);
          binaryValue = binaryValue.padStart(padLength, "0");
        }
        unicodeMessage.push(binaryValue);
      }
    }

    return unicodeMessage.join("");
  };

  // dummy
  private getPixelData() {
    return this.base64Image;
  }

  // dummy
  private setPixelData(data: number[]) {
    const imageData = data;
    return imageData;
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
   * Gets the correct algorithm to use, whether to decode/encode.
   *
   * @param isEncoding: Whether we want the encoding algorithm or decoding.
   *
   * @return The algorithm object to use.
   */
  private getAlgorithm = (isEncoding: boolean) => {
    let algorithm;

    switch (this.algorithm) {
      default:
        if (isEncoding) {
          algorithm = new EncodeLSB();
        } else {
          algorithm = new DecodeLSB();
        }
    }

    return algorithm;
  };
}
