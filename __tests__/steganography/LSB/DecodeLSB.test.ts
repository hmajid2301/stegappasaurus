import { DecodeLSB } from "../../../src/services/steganography/LSB";
import data from "../data";

test.each(data)("DecodeLSB", ({ encodedData, decodedData }) => {
  const binaryMessage = new DecodeLSB().decode(encodedData.LSB);
  expect(binaryMessage).toEqual(decodedData);
});
