import lz from "lzutf8";
import { NativeModules } from "react-native";
import { stringToArray } from "utf8-to-bytes";
import varint from "varint";

import {
  ImageNotEncodedError,
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
  private readonly imageURI: string;
  private readonly width: number;
  private readonly height: number;

  private numToAlgorithmTypes: IAlgorithms = {
    0: "LSB"
  };

  constructor(imageURI: string, width: number, height: number) {
    this.imageURI = imageURI;
    this.width = width;
    this.height = height;
  }

  public async encode(
    message: string,
    algorithm: AlgorithmNames,
    metadata?: IMetaData
  ) {
    try {
      const imageData = await this.getImageData(this.imageURI);
      const binaryMessage = this.convertMessageToBits(message);
      const newImageData = this.encodeData(
        imageData,
        binaryMessage,
        algorithm,
        metadata
      );
      const uri = this.saveImage(newImageData, this.width, this.height);
      return uri;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new MessageTooLongError("Message too long to encode", message);
      } else {
        throw new Error(error);
      }
    }
  }

  public async decode() {
    try {
      const imageData = await this.getImageData(this.imageURI);
      const decodedDecimalData = this.decodeData(imageData);
      const message = lz.decompress(decodedDecimalData);
      return message;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new ImageNotEncodedError(
          "Image is not encoded with any data",
          this.imageURI
        );
      } else {
        throw new Error(error);
      }
    }
  }

  private convertMessageToBits(message: string) {
    const compressedMessage = lz.compress(message);
    const messageLength = varint.encode(compressedMessage.length);
    const arrayToEncode = [...messageLength, ...compressedMessage];

    let bitsToEncode: string = "";
    for (const element of arrayToEncode) {
      bitsToEncode += this.convertDecimalToBytes(element);
    }

    return bitsToEncode;
  }

  private async getImageData(imageURI: string) {
    const imageData = await NativeModules.ImageProcessing.getPixels(imageURI);
    return imageData;
  }

  private encodeData(
    imageData: Uint8ClampedArray,
    data: string,
    algorithm: AlgorithmNames,
    metadata?: IMetaData
  ) {
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
  }

  private setDefaultMetaData(metadata: IMetaData, algorithm: AlgorithmNames) {
    const algorithmNum = this.algorithmsTypesToNum(algorithm);
    metadata.algorithm = algorithmNum;

    return metadata;
  }

  private algorithmsTypesToNum(algorithm = "LSB") {
    const values = Object.values(this.numToAlgorithmTypes);
    return values.indexOf(algorithm);
  }

  private encodeMetadata(imageData: Uint8ClampedArray, metadata: IMetaData) {
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
  }

  private async saveImage(data: number[], width: number, height: number) {
    const uri = await NativeModules.ImageProcessing.setPixels(
      data,
      width,
      height
    );
    return uri;
  }

  private decodeData(imageData: Uint8ClampedArray) {
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
  }

  private decodeMetadata(imageData: Uint8ClampedArray) {
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
  }

  private convertDecimalToBytes(data: number) {
    const binaryString = data.toString(2);
    const nearestByte = Math.ceil(binaryString.length / 8) * 8;
    const byte = binaryString.padStart(nearestByte, "0");
    return byte;
  }

  private convertBytesToDecimal(bytes: string) {
    const decimal = parseInt(bytes, 2);
    return decimal;
  }
}
