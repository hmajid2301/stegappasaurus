import EncodeLSB from '~/actions/Steganography/LSB/EncodeLSB';
import {MessageTooLongError} from '~/actions/Steganography/exceptions';

const testData = [
  {
    imageData: [255, 255, 255, 255, 255, 255, 255, 255],
    binaryMessage: '00000001',
    startEncodingAt: 0,
    expectedImageData: [254, 254, 254, 254, 254, 254, 254, 255],
  },
  {
    imageData: [0, 0, 0, 0, 0, 0, 0, 0],
    binaryMessage: '00000001',
    startEncodingAt: 0,
    expectedImageData: [0, 0, 0, 0, 0, 0, 0, 1],
  },
  {
    imageData: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    binaryMessage: '00000000',
    startEncodingAt: 2,
    expectedImageData: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
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
    binaryMessage: '00000000000001010110100001100101011011000110110001101111',
    startEncodingAt: 0,
    expectedImageData: [
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
  },
  {
    imageData: [],
    binaryMessage: '',
    startEncodingAt: 0,
    expectedImageData: [],
  },
];

describe('EncodeLSB', () => {
  test.each(testData)(
    'encode',
    ({imageData, binaryMessage, startEncodingAt, expectedImageData}) => {
      const encodeLSB = new EncodeLSB();
      const result = encodeLSB.encode(
        imageData,
        binaryMessage,
        startEncodingAt,
      );
      expect(result).toEqual(expectedImageData);
    },
  );

  test('encode w/ action', () => {
    let progress = 0;
    const testAction = () => {
      progress += 1;
    };

    const encodeLSB = new EncodeLSB(testAction);
    const imageData = [10, 45, 100, 20];
    encodeLSB.encode(imageData, '1001');
    expect(progress).toEqual(4);
  });

  test('encode not enough image data items', () => {
    const encodeLSB = new EncodeLSB();
    const imageData = [10, 45];
    expect(() => {
      encodeLSB.encode(imageData, '1001');
    }).toThrow(MessageTooLongError);
  });
});
