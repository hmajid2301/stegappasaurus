import LZUTF8 from 'lzutf8';
import {Image, NativeModules} from 'react-native';
import {stringToArray} from 'utf8-to-bytes';
import varint from 'varint';

import {ImageNotEncodedError, MessageTooLongError} from './exceptions';
import {DecodeLSB, EncodeLSB} from './LSB';

type AlgorithmNames = 'LSBv1';

interface IMetaData {
  [name: string]: number | string;
}

interface IAlgorithms {
  [name: number]: AlgorithmNames;
}

export default class Steganography {
  private readonly imageURI: string;
  private progress: {
    increment: number;
    value: number;
  };

  private numToAlgorithmTypes: IAlgorithms = {
    0: 'LSBv1',
  };

  constructor(imageURI: string) {
    this.imageURI = imageURI;
    this.progress = {
      increment: 0,
      value: 0,
    };
  }

  public async encode(
    message: string,
    algorithm: AlgorithmNames = 'LSBv1',
    metadata?: IMetaData,
  ) {
    try {
      const compressedMessage = LZUTF8.compress(message);
      const binaryMessage = this.convertMessageToBits(compressedMessage);
      const imageData = await this.getImageData(
        this.imageURI,
        binaryMessage.length + 8,
      );
      const newImageData = this.encodeData(
        imageData,
        binaryMessage,
        algorithm,
        metadata,
      );
      const url = await this.getEncodedImageURI(newImageData);
      return url;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new MessageTooLongError('Message too long to encode', message);
      } else {
        throw new Error(error);
      }
    }
  }

  public async decode() {
    try {
      const {width, height} = await this.imageSize(this.imageURI);
      const imageData = await this.getImageData(
        this.imageURI,
        width * height * 3,
      );
      const decodedDecimalData = this.decodeData(imageData);
      const message = LZUTF8.decompress(decodedDecimalData);
      return message;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new ImageNotEncodedError(
          'Image is not encoded with any data',
          this.imageURI,
        );
      } else {
        throw new Error(error);
      }
    }
  }

  public updateProgress() {
    if (this.progress.value >= 100) {
      this.progress.value = 100;
    } else {
      this.progress.value += this.progress.increment;
    }
  }

  public getProgress() {
    return this.progress.value;
  }

  private convertMessageToBits(message: Uint8Array) {
    const messageLength = varint.encode(message.length);
    const arrayToEncode = [...messageLength, ...message];

    let bitsToEncode: string = '';
    for (const element of arrayToEncode) {
      bitsToEncode += this.convertDecimalToBytes(element);
    }

    return bitsToEncode;
  }

  private async getImageData(imageURI: string, length: number) {
    const pixels = await NativeModules.Bitmap.getPixels(imageURI, length);
    return pixels;
  }

  private imageSize(uri: string): Promise<{width: number; height: number}> {
    return new Promise(resolve => {
      Image.getSize(
        uri,
        (width, height) => {
          resolve({width, height});
        },
        () => null,
      );
    });
  }

  private encodeData(
    imageData: number[],
    data: string,
    algorithm: AlgorithmNames,
    metadata?: IMetaData,
  ) {
    this.progress.increment = Math.ceil(100 / data.length);
    metadata = this.setDefaultMetaData(
      metadata && algorithm !== 'LSBv1' ? metadata : {},
      algorithm,
    );
    const {newImageData, startEncodingAt} = this.encodeMetadata(
      imageData,
      metadata,
    );

    let encodedData;
    switch (algorithm) {
      default: {
        encodedData = new EncodeLSB(this.updateProgress.bind(this)).encode(
          newImageData,
          data,
          startEncodingAt,
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

  private algorithmsTypesToNum(algorithm = 'LSBv1') {
    const values = Object.values(this.numToAlgorithmTypes);
    return values.indexOf(algorithm);
  }

  private encodeMetadata(imageData: number[], metadata: IMetaData) {
    const metadataToEncode = [];
    const dataToEncode = ['algorithm'];

    for (const data of dataToEncode) {
      const tempData = metadata[data];
      if (!tempData && tempData !== 0) {
        continue;
      }

      let decimalDataToEncode;
      if (typeof tempData === 'string') {
        decimalDataToEncode = stringToArray(tempData) as number[];
      } else {
        decimalDataToEncode = varint.encode(tempData);
      }
      metadataToEncode.push(...decimalDataToEncode);
    }

    let binaryMetadata = '';
    for (const data of metadataToEncode) {
      binaryMetadata += this.convertDecimalToBytes(data);
    }
    const imageDataWithMetadata = new EncodeLSB().encode(
      imageData,
      binaryMetadata,
    );

    return {
      newImageData: imageDataWithMetadata,
      startEncodingAt: binaryMetadata.length,
    };
  }

  private async getEncodedImageURI(data: number[]) {
    const uri = await NativeModules.Bitmap.setPixels(this.imageURI, data);
    return uri;
  }

  private decodeData(imageData: number[]) {
    const {algorithm, startDecodingAt} = this.decodeMetadata(imageData);
    let decodedMessage;

    switch (algorithm) {
      default: {
        decodedMessage = new DecodeLSB(this.updateProgress.bind(this)).decode(
          imageData,
          startDecodingAt,
        );
      }
    }

    const decodedDecimal: number[] = [];
    for (const byte of decodedMessage) {
      const decimal = this.convertBytesToDecimal(byte);
      decodedDecimal.push(decimal);
    }

    return new Uint8Array(decodedDecimal);
  }

  private decodeMetadata(imageData: number[]) {
    const decodeLSB = new DecodeLSB();
    const algorithmTypeBinary = decodeLSB.decodeNextByte(imageData);
    const algorithmNum = this.convertBytesToDecimal(algorithmTypeBinary);
    const algorithm = this.numToAlgorithmTypes[algorithmNum] || 'LSBv1';
    const metadata: IMetaData = {};

    const startDecodingAt = decodeLSB.getCurrentIndex();
    return {
      algorithm,
      metadata,
      startDecodingAt,
    };
  }

  private convertDecimalToBytes(data: number) {
    const binaryString = data.toString(2);
    const nearestByte = Math.ceil(binaryString.length / 8) * 8;
    const byte = binaryString.padStart(nearestByte, '0');
    return byte;
  }

  private convertBytesToDecimal(bytes: string) {
    const decimal = parseInt(bytes, 2);
    return decimal;
  }
}
