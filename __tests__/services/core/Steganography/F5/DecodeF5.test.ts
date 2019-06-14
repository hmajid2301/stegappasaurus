import { Steganography } from "../../../../../src/services/core";
import { DecodeF5 } from "../../../../../src/services/core/Steganography/F5";
import data from "../data";

test.each(data)("DecodeF5", ({ encoded, decodedData }) => {
  const steg = new Steganography(encoded.F5.image) as any;
  const imageData = steg.getImageData();
  const binaryMessage = new DecodeF5(
    encoded.F5.limit,
    encoded.F5.password
  ).decode(imageData, steg.width, steg.height);
  expect(binaryMessage).toEqual(decodedData);
});
