import DecodeLSB from '~/actions/Steganography/LSB/DecodeLSB';
import {ImageNotEncodedError} from '~/actions/Steganography/exceptions';

const testData = [
  {
    expectedMessage: ['00000001'],
    startDecodingAt: 0,
    imageData: [254, 254, 254, 254, 254, 254, 254, 255],
    end: 1,
  },
  {
    expectedMessage: ['00000001'],
    startDecodingAt: 0,
    imageData: [0, 0, 0, 0, 0, 0, 0, 1],
    end: 1,
  },
  {
    expectedMessage: ['00000000'],
    startDecodingAt: 2,
    imageData: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    end: 1,
  },
  {
    expectedMessage: [
      '00000000',
      '00000101',
      '01101000',
      '01100101',
      '01101100',
      '01101100',
      '01101111',
    ],
    startDecodingAt: 0,
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
    end: 7,
  },
];

describe('DecodeLSB', () => {
  test.each(testData)(
    'decode',
    ({expectedMessage, imageData, end, startDecodingAt}) => {
      const decodeLSB = new DecodeLSB();
      const decodedMessage = decodeLSB.decode(imageData, startDecodingAt, end);
      expect(decodedMessage).toEqual(expectedMessage);
    },
  );

  test('decode w/ action', () => {
    let progress = 0;
    const testAction = () => {
      progress += 1;
    };

    const decodeLSB = new DecodeLSB(testAction);
    const imageData = [10, 45, 100, 20, 10, 4, 5, 6];
    decodeLSB.decode(imageData, 0, 1);
    expect(progress).toEqual(8);
  });

  test('decode not encoded', () => {
    const decodeLSB = new DecodeLSB();
    const imageData = [10, 45, 10, 10, 10, 9, 8, 55];
    expect(() => {
      decodeLSB.decode(imageData, 0, 2);
    }).toThrow(ImageNotEncodedError);
  });
});
