import { createCanvas, createImageData, Image } from "canvas";

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
type AlgorithmNames = "F5" | "LSB-PNG" | "LSB-DCT";
interface ImageData {
  base64Image: string;
  width: number;
  height: number;
}

export default class Steganography {
  /** The algorithm to use to encode/decode i.e. LSB. */
  private readonly algorithm: AlgorithmNames;
  /** Image pixel data as an array from 0 - 255 and in the form `RGBA`. */
  private readonly imageData: ImageData;

  constructor(algorithm: AlgorithmNames, imageData: ImageData) {
    this.algorithm = algorithm;
    this.imageData = imageData;
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
    const pixelData = this.getImageData();
    const newPixelData = this.encodeData(pixelData, binaryMessage);
    const dataURL = this.putImageData(newPixelData);
    return dataURL;
  };

  /**
   * Decodes an image to get an encoded message.
   *
   * @return The decoded message.
   */
  public decode = () => {
    let message = "";
    try {
      const pixelData = this.getImageData();
      const unicode = this.decodeData(pixelData);
      message = this.convertBinaryToMessage(unicode);
    } catch (e) {
      if (e instanceof RangeError) {
        message = "Invalid image, cannot decode.";
      }
    }

    return message;
  };

  /**
   * Gets image data from a base64 image. Where the image
   * data is an array RGBA (Red, Green, Blue, Alpha), with values
   * from 0 - 255 (1 byte).
   *
   * @return The image data.
   */
  private getImageData = () => {
    const { width, height } = this.imageData;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d", { alpha: false });
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.onerror = (err: any) => {
      throw err;
    };
    img.src = this.imageData.base64Image;
    const imageData = ctx.getImageData(0, 0, width, height);
    return imageData.data;
  };

  /**
   * Changes the image data with the new encoded data.
   *
   * @param newData: The new image pixel data.
   *
   * @return The new image as base64 string.
   */
  private putImageData = (newData: Uint8ClampedArray) => {
    const { width, height } = this.imageData;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d", { alpha: false });
    const imageData = createImageData(newData, width, height);
    ctx.putImageData(imageData, 0, 0);

    let data = "";
    if (this.algorithm === "LSB-PNG") {
      data = canvas.toDataURL("image/png");
    } else {
      data = canvas.toDataURL("image/jpeg");
    }
    return data;
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
    const isASCII = this.isASCII(message);
    let binaryMessage = [];

    if (isASCII) {
      binaryMessage = this.encodeAsASCII(message);
    } else {
      binaryMessage = this.encodeAsUnicodeString(message);
    }

    const binaryMessageLength = this.getMessageLengthBinary(binaryMessage);
    binaryMessage.unshift(binaryMessageLength);
    return binaryMessage;
  };

  /**
   * Checks if the message can be encoded in ASCII. For example
   * unicode characters like emojis cannot be encoded in ASCII but
   * normal English characters can like "A" or "1".
   *
   * @param message: The message that will be encoded.
   *
   * @return True if the message can be encoded in ASCII, else returns False.
   */
  private isASCII = (message: string) => {
    for (const character of message) {
      const value = character.codePointAt(0) || -1;
      if (value < 0 || value > 127) {
        return false;
      }
    }
    return true;
  };

  /**
   * Encodes the message as an ASCII string, For example "A" -> ["01000001"].
   *
   * @param message: The message to encode in ASCII binary.
   *
   * @return The message in binary to encode as an array where each item is a character
   * in the message.
   */
  private encodeAsASCII = (message: string) => {
    const binaryMessage = [];
    for (const character of message) {
      const codePoint = character.codePointAt(0) || 0;
      const binaryValue = this.convertToBinary(codePoint);
      binaryMessage.push(binaryValue);
    }

    return binaryMessage;
  };

  /**
   * Encodes the message as a unicode string, then into ascii binary.
   * For example "A" -> "\x41" -> ["01011100", "01111000", "00110100", "00110001"].
   * This is used when we want to encode unicode characters such as emojis in our
   * message.
   *
   * @param message: The message to encode in unicode ascii binary.
   *
   * @return The message in binary to encode as an array where each item is a character
   * in the message.
   */
  private encodeAsUnicodeString = (message: string) => {
    const binaryMessage = [];

    for (const character of message) {
      const codePoint = character.codePointAt(0) || 0;
      const encodingType = codePoint > 128 ? "\\u" : "\\x";
      const unicode = encodingType + codePoint.toString(16);

      for (const bit of unicode) {
        const binaryValue = this.convertToBinary(bit.codePointAt(0) || 0);
        binaryMessage.push(binaryValue);
      }
    }

    return binaryMessage;
  };

  /**
   * Gets the message length in binary. Gets the message to the nearest byte.
   *
   * @param message: The message where each character is a byte.
   *
   * @return The message length in binary.
   */
  private getMessageLengthBinary(message: string[]) {
    let messageLength = "";
    if (message.length !== 0) {
      messageLength = this.convertToBinary(message.length);
    }
    return messageLength;
  }

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
   * Converts ASCII binary decoded from image back into original unicode. First converts binary
   * ascii into a unicode string. Then the unicode string back into original unicode message.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @return The encoded message as a string.
   */
  private convertBinaryToMessage = (binaryMessage: string[]) => {
    let message = "";
    for (const currentByte of binaryMessage) {
      message += String.fromCodePoint(parseInt(currentByte, 2));
    }
    const decodedMessage = message.normalize();
    return decodedMessage;
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
  private encodeData = (
    pixelData: Uint8ClampedArray,
    binaryMessage: string[]
  ) => {
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
  private decodeData = (pixelData: Uint8ClampedArray) => {
    let decodedMessage;

    switch (this.algorithm) {
      default:
        decodedMessage = new DecodeLSB().decode(pixelData);
    }

    return decodedMessage;
  };
}
