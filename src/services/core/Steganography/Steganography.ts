import { createCanvas, createImageData, Image } from "canvas";
import { arrayToString, stringToArray } from "utf8-to-bytes";
import varint from "varint";

import { IEncode } from "../../web/models";
import {
  ImageNotEncodedError,
  InvalidImageError,
  MessageTooLongError
} from "../exceptions";
import { DecodeLSB, EncodeLSB } from "./LSB";

/**
 * This class chooses what algorithm to use. Calls the correct functions to encode/decode data.
 * It's main job is to do the common functions required by all steganography algorithm.
 *
 */

type AlgorithmNames = IEncode["algorithm"];

interface ImageData {
  base64Image: string;
  width: number;
  height: number;
}

interface IAlgorithms {
  [name: number]: AlgorithmNames;
}
const numToAlgorithmTypes: IAlgorithms = {
  0: "LSB"
};

const algorithmsTypesToNum = (algorithm = "LSB") => {
  const values = Object.values(numToAlgorithmTypes);
  return values.find(item => item === algorithm);
};

export default class Steganography {
  /** Image pixel data as an array from (values of 0 - 255, or 1 byte) and as `RGBA`. */
  private readonly imageData: ImageData;

  constructor(imageData: ImageData) {
    this.imageData = imageData;
  }

  /**
   * Encodes a string (message) into an image using steganography algorithms.
   *
   * * We get our image data as RGBA array.
   * * We convert our message into bytes, this ordered as `[message length, message]`.
   * * Next we encode our algorithm type into the pixel data.
   * * Encode our data with the correct algorithm.
   * * Convert to base 64.
   *
   * @param message: The message to encode as a string.
   *
   * @param algorithm: The algorithm to encode the data with.
   *
   * @return The encoded image as a base64 string.
   */
  public encode = (message: string, algorithm: AlgorithmNames) => {
    try {
      const pixelData = this.getImageData();
      const binaryMessage = this.convertMessageToBits(message);
      const newPixelData = this.encodeData(pixelData, binaryMessage, algorithm);
      const dataURL = this.putImageData(newPixelData, algorithm);
      return dataURL;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new MessageTooLongError("Message too long to encode", message);
      } else {
        throw new Error(error);
      }
    }
  };

  /**
   * Decodes an image to get a message.
   *
   * * Get image data as a RGBA array.
   * * Decode algorithm type.
   * * Convert unicode array to message.
   *
   * @return The decoded message.
   */
  public decode = () => {
    try {
      const pixelData = this.getImageData();
      const unicode = this.decodeData(pixelData);
      const message = arrayToString(unicode);
      return message;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new ImageNotEncodedError(
          "Image is not encoded with any data",
          this.imageData.base64Image
        );
      } else {
        throw new Error(error);
      }
    }
  };

  /**
   * Converts a string message into bytes.
   * * Uses varint 128 to encode message length.
   * * Then converts the message to decimal array.
   * * Then works out length of this array.
   * * Converts `[message length, message]` into a byte string.
   *
   * @param message: The message to encode as a string.
   *
   * @return A binary string (each character is a byte).
   */
  private convertMessageToBits = (message: string) => {
    const arrayMessage = stringToArray(message) as number[];
    const messageLength = varint.encode(arrayMessage.length);
    const arrayToEncode = [...messageLength, ...arrayMessage];

    let bitsToEncode: string = "";
    for (const element of arrayToEncode) {
      bitsToEncode += this.convertDecimalToBytes(element);
    }

    return bitsToEncode;
  };

  /**
   * Gets image data from a base64 image. Where the image
   * data is an array RGBA (Red, Green, Blue, Alpha), with values
   * from 0 - 255 (1 byte).
   *
   * @return The image data.
   */
  private getImageData = () => {
    const { width, height, base64Image } = this.imageData;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d", { alpha: false });

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.onerror = () => {
      throw new InvalidImageError(
        "Invalid base 64 image data.",
        this.imageData.base64Image
      );
    };
    img.src = base64Image;
    const imageData = ctx.getImageData(0, 0, width, height);
    return imageData.data;
  };

  /**
   * Changes the image data with the new encoded data.
   *
   * @param newData: The new image pixel data.
   *
   * @param algorithm: The algorithm to encode the data with. Determines image type.
   *
   * @return The new image as base64 string.
   */
  private putImageData = (
    newData: Uint8ClampedArray,
    algorithm: AlgorithmNames
  ) => {
    const { width, height } = this.imageData;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d", { alpha: false });
    const imageData = createImageData(newData, width, height);
    ctx.putImageData(imageData, 0, 0);

    let data = "";
    if (algorithm === "LSB") {
      data = canvas.toDataURL("image/png");
    } else {
      data = canvas.toDataURL("image/jpeg");
    }
    return data;
  };

  /**
   * Encodes the data based on the selected algorithm.
   *
   * @param pixelData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`
   *
   * @param data: The message to encode, where each element is a character in the message
   * in unicode.
   *
   * @param algorithm: The algorithm to encode the data with.
   *
   * @return The encoded image data.
   */
  private encodeData = (
    pixelData: Uint8ClampedArray,
    data: string,
    algorithm: AlgorithmNames
  ) => {
    const newPixelData = this.encodeAlgorithm(pixelData, algorithm);
    let encodedData;

    switch (algorithm) {
      default:
        encodedData = new EncodeLSB().encode(newPixelData, data, 1);
    }

    return encodedData;
  };

  /**
   * Encodes the data with the encoding algorithm. Each algorithm is given a number i.e. LSB = 0.
   * This number is then converted to binary and encoded within the first byte of the image.
   *
   * @param pixelData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`
   *
   * @param algorithm: The algorithm to encode the data with.
   *
   * @return The encoded image data, with algorithm encoded within it.
   */
  private encodeAlgorithm(
    pixelData: Uint8ClampedArray,
    algorithm: AlgorithmNames
  ) {
    const algorithmNum = algorithmsTypesToNum(algorithm) || 0;
    const binaryAlgorithm = this.convertDecimalToBytes(algorithmNum);
    const pixelDataWithMetadata = new EncodeLSB().encode(
      pixelData,
      binaryAlgorithm
    );
    return pixelDataWithMetadata;
  }

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
    const algorithm = this.decodeAlgorithm(pixelData);

    switch (algorithm) {
      default:
        decodedMessage = new DecodeLSB().decode(pixelData, 1);
    }

    return decodedMessage;
  };

  private decodeAlgorithm = (pixelData: Uint8ClampedArray) => {
    const binaryMetadata = new DecodeLSB().getNextLSBByte(pixelData);
    const algorithmNum = this.convertBytesToDecimal(binaryMetadata);
    const algorithm = numToAlgorithmTypes[algorithmNum] || "LSB";
    return algorithm;
  };

  /**
   * Converts a decimal integer into a byte. Pads data to the nearest
   * byte for example if data = 4 then this function will return "00000100".
   *
   * @param data: Integer value to convert to string.
   *
   * @return The padded binary data, as a byte.
   */
  private convertDecimalToBytes = (data: number) => {
    const binaryString = data.toString(2);
    const nearestByte = Math.ceil(binaryString.length / 8) * 8;
    const byte = binaryString.padStart(nearestByte, "0");
    return byte;
  };

  /**
   * Converts a binary string into a decimal integer.
   *
   * @param bytes: The binary string to convert.
   *
   * @return The binary number (string) as a decimal integer.
   */
  private convertBytesToDecimal = (bytes: string) => {
    const decimal = parseInt(bytes, 2);
    return decimal;
  };
}
