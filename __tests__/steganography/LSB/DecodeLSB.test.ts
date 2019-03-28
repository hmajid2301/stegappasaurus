import { DecodeLSB } from "../../../src/services/steganography/LSB";
import data from "../data";

test.each(data)("DecodeLSB", ({ encoded, decodedData }) => {
  const binaryMessage = new DecodeLSB().decode(encoded.LSB.data);
  expect(binaryMessage).toEqual(decodedData);
});
