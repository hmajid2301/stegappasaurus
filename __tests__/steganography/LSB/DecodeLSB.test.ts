import { DecodeLSB } from "../../../src/services/core/Steganography/LSB";
import data from "../data";

test.each(data)("DecodeLSB", ({ encoded, decodedData }) => {
  const binaryMessage = new DecodeLSB().decode(encoded.LSB.data, 1);
  expect(binaryMessage).toEqual(decodedData);
});
