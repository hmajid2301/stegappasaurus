import {NativeModules} from 'react-native';

import Steganography from '~/actions/Steganography/Steganography';
import EncodeLSB from '~/actions/Steganography/LSB/EncodeLSB';
import {
  ImageNotEncodedError,
  MessageTooLongError,
} from '~/actions/Steganography/exceptions';

NativeModules.Bitmap = {
  getPixels: jest.fn(),
  setPixels: jest.fn(),
};

const encodeData = [
  {
    message: 'ABC',
    imageData: [
      116,
      52,
      46,
      118,
      54,
      48,
      152,
      92,
      84,
      140,
      82,
      74,
      96,
      45,
      32,
      121,
      72,
      59,
      147,
      98,
      85,
      118,
      70,
      56,
      94,
      45,
      31,
      120,
      68,
      57,
      126,
      69,
      58,
      99,
      35,
      24,
      89,
      21,
      14,
      90,
      16,
      13,
      81,
      0,
      1,
      93,
      10,
      10,
      94,
      11,
      11,
      96,
      11,
      13,
      95,
      9,
      8,
    ],
    encodedURI: 'new_image.png',
    encodedImageData: [
      116,
      52,
      46,
      118,
      54,
      48,
      152,
      92,
      84,
      140,
      82,
      74,
      96,
      44,
      33,
      121,
      72,
      59,
      146,
      98,
      84,
      118,
      70,
      57,
      94,
      45,
      30,
      120,
      68,
      56,
      127,
      68,
      58,
      99,
      34,
      24,
      88,
      20,
      15,
      91,
      16,
      13,
      81,
      0,
      1,
      93,
      10,
      10,
      94,
      11,
      11,
      96,
      11,
      13,
      95,
      9,
      8,
    ],
  },
];

describe('Steganography Encode', () => {
  test.each(encodeData)(
    'encode LSBv1',
    async ({message, imageData, encodedURI, encodedImageData}) => {
      NativeModules.Bitmap.getPixels.mockImplementation(() => {
        return imageData;
      });

      NativeModules.Bitmap.setPixels.mockImplementation(() => {
        return encodedURI;
      });

      const spy = jest.spyOn(EncodeLSB.prototype, 'encode');
      const steg = new Steganography('temp.png');
      const result = await steg.encode(message, {algorithm: 'LSBv1'});
      expect(result).toEqual(encodedURI);
      expect(spy).toHaveReturnedWith(encodedImageData);
    },
  );

  test('encode image too small', async () => {
    NativeModules.Bitmap.getPixels.mockImplementation(() => {
      return [116, 106, 204];
    });

    const steg = new Steganography('temp.png');
    try {
      await steg.encode('abcdefg!', {algorithm: 'LSBv1'});
    } catch (error) {
      expect(error).toBeInstanceOf(MessageTooLongError);
    }
  });
});

const decodeData = [
  {
    message: 'ABC',
    imageData: [
      116,
      52,
      46,
      118,
      54,
      48,
      152,
      92,
      84,
      140,
      82,
      74,
      96,
      44,
      33,
      121,
      72,
      59,
      146,
      98,
      84,
      118,
      70,
      57,
      94,
      45,
      30,
      120,
      68,
      56,
      127,
      68,
      58,
      99,
      34,
      24,
      88,
      20,
      15,
      91,
      16,
      13,
      81,
      0,
      1,
      93,
      10,
      10,
      94,
      11,
      11,
      96,
      11,
      13,
      95,
      9,
      8,
    ],
  },
];

describe('Steganography Decode', () => {
  test.each(decodeData)('decode LSBv1', async ({message, imageData}) => {
    NativeModules.Bitmap.getPixels.mockImplementation(
      (_: string, start: number, end: number) => {
        return imageData.slice(start * 3, end * 3);
      },
    );

    const steg = new Steganography('temp.png');
    const result = await steg.decode();
    expect(result).toEqual(message);
  });

  test('decode image not encoded', async () => {
    NativeModules.Bitmap.getPixels.mockImplementation(() => {
      return [116, 106, 204];
    });

    const steg = new Steganography('temp.png');
    try {
      await steg.decode();
    } catch (error) {
      expect(error).toBeInstanceOf(ImageNotEncodedError);
    }
  });
});
