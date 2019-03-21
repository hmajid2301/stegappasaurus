import { EncodeLSB } from "../../../src/services/steganography/LSB";
import data from "../data";

test.each(data)("EncodeLSB", ({ binaryMessage, imageData, encodedData }) => {
  const newImageData = new EncodeLSB().encode(imageData, binaryMessage);
  expect(newImageData).toEqual(encodedData.LSB);
});
