import {
  DecodeLSB,
  EncodeLSB
} from "../../../../../src/services/core/Steganography/LSB";
import TestData from "../data";

test.each(TestData)("EncodeLSB", ({ binaryMessage, data, decoded }) => {
  const newImageData = new EncodeLSB().encode(data, binaryMessage, 10);
  const message = new DecodeLSB().decode(newImageData, 10);
  expect(message).toStrictEqual(decoded);
});
