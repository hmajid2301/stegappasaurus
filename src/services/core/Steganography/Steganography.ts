import { createCanvas, createImageData, Image } from "canvas";
import { arrayToString, stringToArray } from "utf8-to-bytes";
import varint from "varint";

import { IEncode } from "../../web/models";
import {
  ImageNotEncodedError,
  InvalidImageError,
  MessageTooLongError
} from "../exceptions";
import { DecodeDCT, EncodeDCT } from "./DCT";
import { DecodeLSB, EncodeLSB } from "./LSB";

type AlgorithmNames = IEncode["algorithm"];

interface IMetaData {
  [name: string]: number;
}

interface IAlgorithms {
  [name: number]: AlgorithmNames;
}
const numToAlgorithmTypes: IAlgorithms = {
  0: "LSB",
  1: "DCT"
};

const algorithmsTypesToNum = (algorithm = "LSB") => {
  const values = Object.values(numToAlgorithmTypes);
  return values.find(item => item === algorithm);
};

export default class Steganography {
  /** Image pixel data as an array from (values of 0 - 255, or 1 byte) and as `RGBA`. */
  private readonly imageData: string;
  /** Image width in pixels. */
  private width = 0;
  /** Image height in pixels. */
  private height = 0;

  constructor(imageData: string) {
    this.imageData = imageData;
    const img = new Image();
    img.onload = () => {
      this.width = img.naturalWidth;
      this.height = img.naturalHeight;
    };

    img.src = this.imageData;
  }

  /**
   * Encodes a string (message) into an image using steganography algorithms.
   *
   * * Get image data as RGBA array
   * * Convert the message into bytes
   * * Encode our algorithm type into the data
   * * Encode our data into the image data
   * * Convert the image to base64 string
   *
   * @param message: The message to encode as a string.
   *
   * @param algorithm: The algorithm to encode the data with.
   *
   * @param metadata: `Optional` extra metadata for the encoding algorithm i.e. limit for DCT.
   *
   * @return The encoded image as a base64 string.
   */
  public encode = (
    message: string,
    algorithm: AlgorithmNames,
    metadata?: IMetaData
  ) => {
    try {
      const pixelData = this.getImageData();
      const binaryMessage = this.convertMessageToBits(message);
      const newPixelData = this.encodeData(
        pixelData,
        binaryMessage,
        algorithm,
        metadata
      );
      const dataURL = this.getNewBase64Image(
        new Uint8ClampedArray(newPixelData)
      );
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
   * Decodes image data to get an encoded message.
   *
   * * Get image data as a RGBA array
   * * Decode algorithm type
   * * Decode our data into the image data
   * * Convert binary array to a message
   *
   * @return The decoded message as a string.
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
          this.imageData
        );
      } else {
        throw new Error(error);
      }
    }
  };

  /**
   * Converts a message into binary string.
   *
   * * Uses varint128 to encode message length.
   * * Then converts the message to decimal array.
   * * Then works out length of this array.
   * * Converts data into a binary string.
   *
   * @param message: The message to encode as a string.
   *
   * @return A binary string (the data to encode).
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
   * Gets image data from a base64 image. Where the image data is an array RGBA
   * (Red, Green, Blue, Alpha), with values from 0 - 255 (1 byte).
   *
   * @return The image data, as Uint8ClampedArray.
   */
  private getImageData = () => {
    const canvas = createCanvas(this.width, this.height);
    const ctx = canvas.getContext("2d", { alpha: false });

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.onerror = () => {
      throw new InvalidImageError(
        "Invalid base 64 image data.",
        this.imageData
      );
    };
    img.src = this.imageData;
    const imageData = ctx.getImageData(0, 0, this.width, this.height);
    return imageData.data;
  };

  /**
   * Converts image data (Uint8ClampedArray) into a base64 string.
   *
   * @param data: The image data, to convert to base64.
   *
   * @return The new image as base64 string.
   */
  private getNewBase64Image = (data: Uint8ClampedArray) => {
    const canvas = createCanvas(this.width, this.height);
    const ctx = canvas.getContext("2d", { alpha: false });
    const imageData = createImageData(data, this.width, this.height);
    ctx.putImageData(imageData, 0, 0);

    const base64Image = canvas.toDataURL("image/png");
    return base64Image;
  };

  /**
   * Encodes the data based on the selected algorithm.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`
   *
   * @param data: The message to encode, where each element is a character in the message
   * in unicode.
   *
   * @param algorithm: The algorithm to encode the data with.
   *
   * @param metadata: `Optional` extra metadata for the encoding algorithm i.e. limit for DCT.
   *
   * @return The encoded image data, as a Uint8ClampedArray.
   */
  private encodeData = (
    imageData: Uint8ClampedArray,
    data: string,
    algorithm: AlgorithmNames,
    metadata?: IMetaData
  ) => {
    const newPixelData = this.encodeMetadata(imageData, algorithm, metadata);
    let encodedData;

    switch (algorithm) {
      case "DCT":
        encodedData = new EncodeDCT(
          metadata !== undefined ? metadata.limit : 15
        ).encode(newPixelData, this.width, this.height, data, 1);
        break;
      default:
        encodedData = new EncodeLSB().encode(newPixelData, data, 1);
    }

    return encodedData;
  };

  /**
   * Encodes metadata data with the encoding algorithm. Each algorithm is given a number i.e. LSB = 0.
   * This number is then converted to binary and encoded within the first byte of the image.
   * Some algorithms like DCT will have extra metadata like limit, which will also be encoded.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @param algorithm: The algorithm to encode the data with.
   *
   * @param metadata: `Optional` extra metadata for the encoding algorithm i.e. limit for DCT.
   *
   * @return The image data with the metadata encoded in the image data.
   */
  private encodeMetadata(
    imageData: Uint8ClampedArray,
    algorithm: AlgorithmNames,
    metadata?: IMetaData
  ) {
    const algorithmNum = algorithmsTypesToNum(algorithm) || 0;
    if (metadata === undefined) {
      metadata = {};
    }
    metadata.algorithm = algorithmNum;
    const metadataToEncode = [];
    for (const data of Object.values(metadata)) {
      const varintData = varint.encode(data);
      metadataToEncode.push(...varintData);
    }

    let binaryMetadata = "";
    for (const data of metadataToEncode) {
      binaryMetadata += this.convertDecimalToBytes(data);
    }
    const pixelDataWithMetadata = new EncodeLSB().encode(
      imageData,
      binaryMetadata
    );
    return pixelDataWithMetadata;
  }

  /**
   * Decodes the a message, from image data based on the select algorithm.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @return The decoded message, as a string.
   */
  private decodeData = (imageData: Uint8ClampedArray) => {
    let decodedMessage;
    const { algorithm, metadata } = this.decodeMetadata(imageData);

    switch (algorithm) {
      case "DCT":
        const starting = Math.ceil(Math.log2(metadata.limit) / 3);
        decodedMessage = new DecodeDCT(metadata.limit).decode(
          imageData,
          this.width,
          this.height,
          starting
        );
        break;
      default:
        decodedMessage = new DecodeLSB().decode(imageData, 1);
    }

    return decodedMessage;
  };

  /**
   * Decodes metadata from the image, which includes the encoding algorithm used (i.e. DCT or LSB). Some algorithms such as DCT have extra data like limit.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @return The encoding algorithm and metadata for that algorithm.
   */
  private decodeMetadata = (imageData: Uint8ClampedArray) => {
    const binaryMetadata = new DecodeLSB().getNextLSBByte(imageData);
    const algorithmNum = this.convertBytesToDecimal(binaryMetadata);
    const algorithm = numToAlgorithmTypes[algorithmNum] || "LSB";
    const metadata: IMetaData = {};

    switch (algorithm) {
      case "DCT":
        const limit = new DecodeLSB().decodeVarint(imageData.subarray(0, 10));
        metadata.limit = varint.decode(limit);
        break;
    }
    return { algorithm, metadata };
  };

  /**
   * Converts a decimal integer into a byte. Pads data to the nearest
   * byte for example if data = 4 then this function will return "00000100".
   *
   * @param data: Integer value to convert to binary string.
   *
   * @return The padded binary data, as a binary (byte) string.
   */
  private convertDecimalToBytes = (data: number) => {
    const binaryString = data.toString(2);
    const nearestByte = Math.ceil(binaryString.length / 8) * 8;
    const byte = binaryString.padStart(nearestByte, "0");
    return byte;
  };

  /**
   * Converts a binary (bytes) string into a decimal integer.
   *
   * @param bytes: The binary string to convert, into an integer.
   *
   * @return The binary number (string) as a decimal integer.
   */
  private convertBytesToDecimal = (bytes: string) => {
    const decimal = parseInt(bytes, 2);
    return decimal;
  };
}
