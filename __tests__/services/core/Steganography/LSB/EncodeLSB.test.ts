import { Steganography } from "../../../../../src/services/core";
import { EncodeLSB } from "../../../../../src/services/core/Steganography/LSB";
import data from "../data";

test.each(data)("EncodeLSB", ({ binaryMessage, image, encoded }) => {
  const imageData = (new Steganography(image) as any).getImageData();
  const newImageData = new EncodeLSB().encode(imageData, binaryMessage, 10);
  const imageDataSubset = Array.from(
    newImageData.subarray(0, encoded.LSB.length)
  );
  expect(imageDataSubset).toEqual(encoded.LSB.data);
});
