import { createCanvas, createImageData, Image } from "canvas";
import sizeOf from "image-size";
import lz from "lzutf8";
// @ts-ignore
import { stringToArray } from "utf8-to-bytes";
import varint from "varint";

import {
  ImageNotEncodedError,
  ImageTooSmallError,
  InvalidImageError,
  MessageTooLongError
} from "~/actions/Steganography/exceptions";
import { DecodeLSB, EncodeLSB } from "./LSB";

type AlgorithmNames = "LSB";

interface IMetaData {
  [name: string]: number | string;
}

interface IAlgorithms {
  [name: number]: AlgorithmNames;
}

export default class Steganography {
  /** Image pixel data as an array from (values of 0 - 255, or 1 byte) and as `RGBA`. */
  private readonly imageData: string;
  /** Image width in pixels. */
  private width: number;
  /** Image height in pixels. */
  private height: number;

  private numToAlgorithmTypes: IAlgorithms = {
    0: "LSB"
  };

  constructor(imageData: string) {
    this.imageData = imageData;

    const img = Buffer.from(this.imageData.substr(22), "base64");
    const dimensions = sizeOf(img);
    this.width = dimensions.width;
    this.height = dimensions.height;

    if (this.width < 64 || this.height < 64) {
      throw new ImageTooSmallError(
        "Image too small to encode, image must be at least 64 by 64 pixels.",
        imageData
      );
    }
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
      const imageData = this.getImageData();
      const binaryMessage = this.convertMessageToBits(message);
      const newImageData = this.encodeData(
        imageData,
        binaryMessage,
        algorithm,
        metadata
      );
      const dataURL = this.getNewBase64Image(
        new Uint8ClampedArray(newImageData)
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
      const imageData = this.getImageData();
      const decodedDecimalData = this.decodeData(imageData);
      const message = lz.decompress(decodedDecimalData);
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
    const compressedMessage = lz.compress(message);
    const messageLength = varint.encode(compressedMessage.length);
    const arrayToEncode = [...messageLength, ...compressedMessage];

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
    metadata = this.setDefaultMetaData(
      metadata && algorithm !== "LSB" ? metadata : {},
      algorithm
    );
    const { newImageData, startEncodingAt } = this.encodeMetadata(
      imageData,
      metadata
    );
    let encodedData;

    switch (algorithm) {
      default: {
        encodedData = new EncodeLSB().encode(
          newImageData,
          data,
          startEncodingAt
        );
      }
    }

    return encodedData;
  };

  /**
   * If metadata is not set defines some default values for the metadata i.e. 15 for limit.
   *
   * @param metadata: Metadata for the encoding algorithm i.e. limit for DCT.
   *
   * @param algorithm: The algorithm to encode the data with.
   *
   * @return The metadata filled in with default values (if required)
   */
  private setDefaultMetaData = (
    metadata: IMetaData,
    algorithm: AlgorithmNames
  ) => {
    const algorithmNum = this.algorithmsTypesToNum(algorithm);
    metadata.algorithm = algorithmNum;

    return metadata;
  };

  /**
   * Converts an algorithm type to a decimal number representing that algorithm, i.e. 0 for LSB.
   *
   * @param algorithm: The algorithm to decode/encode the data with.
   *
   * @return The algorithm as a decimal integer.
   */
  private algorithmsTypesToNum = (algorithm = "LSB") => {
    const values = Object.values(this.numToAlgorithmTypes);
    return values.indexOf(algorithm);
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
  private encodeMetadata = (
    imageData: Uint8ClampedArray,
    metadata: IMetaData
  ) => {
    const metadataToEncode = [];
    const dataToEncode = ["algorithm", "limit", "password"];

    for (const data of dataToEncode) {
      const tempData = metadata[data];
      if (!tempData && tempData !== 0) {
        continue;
      }

      let decimalDataToEncode;
      if (typeof tempData === "string") {
        decimalDataToEncode = stringToArray(tempData) as number[];
      } else {
        decimalDataToEncode = varint.encode(tempData);
      }
      metadataToEncode.push(...decimalDataToEncode);
    }

    let binaryMetadata = "";
    for (const data of metadataToEncode) {
      binaryMetadata += this.convertDecimalToBytes(data);
    }
    const imageDataWithMetadata = new EncodeLSB().encode(
      imageData,
      binaryMetadata
    );

    let encodedPixels = binaryMetadata.length;
    encodedPixels += Math.floor(encodedPixels / 4);
    return {
      newImageData: imageDataWithMetadata,
      startEncodingAt: encodedPixels
    };
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
   * Decodes the a message, from image data based on the select algorithm.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @return The decoded message, as a uint8 array (utf8).
   */
  private decodeData = (imageData: Uint8ClampedArray) => {
    const { algorithm, startDecodingAt } = this.decodeMetadata(imageData);
    let decodedMessage;

    switch (algorithm) {
      default: {
        decodedMessage = new DecodeLSB().decode(imageData, startDecodingAt);
      }
    }

    const decodedDecimal: number[] = [];
    for (const byte of decodedMessage) {
      const decimal = this.convertBytesToDecimal(byte);
      decodedDecimal.push(decimal);
    }

    return new Uint8Array(decodedDecimal);
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
    const decodeLSB = new DecodeLSB();
    const algorithmTypeBinary = decodeLSB.decodeNextByte(imageData);
    const algorithmNum = this.convertBytesToDecimal(algorithmTypeBinary);
    const algorithm = this.numToAlgorithmTypes[algorithmNum] || "LSB";
    const metadata: IMetaData = {};

    const startDecodingAt = decodeLSB.getCurrentIndex();
    return {
      algorithm,
      metadata,
      startDecodingAt
    };
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
