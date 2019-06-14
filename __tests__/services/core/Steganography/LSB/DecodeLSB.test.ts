import { Steganography } from "../../../../../src/services/core";
import { DecodeLSB } from "../../../../../src/services/core/Steganography/LSB";
import data from "../data";

test.each(data)("DecodeLSB", ({ encoded, decodedData }) => {
  const imageData = (new Steganography(
    encoded.LSB.image
  ) as any).getImageData();
  const binaryMessage = new DecodeLSB().decode(imageData, 10);
  expect(binaryMessage).toStrictEqual(decodedData);
});
