import { EncodeLSB } from "../../../src/services/steganography/LSB";
import data from "../data";

test.each(data)("EncodeLSB", ({ binaryMessage, pixelData, encoded }) => {
  const newImageData = new EncodeLSB().encode(pixelData, binaryMessage);
  expect(newImageData).toEqual(encoded.LSB.data);
});
