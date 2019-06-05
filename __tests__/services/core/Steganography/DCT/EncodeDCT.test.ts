import { Steganography } from "../../../../../src/services/core";
import { EncodeDCT } from "../../../../../src/services/core/Steganography/DCT";
import data from "../data";

test.each(data)("EncodeDCT", ({ binaryMessage, image, encoded }) => {
  const steg = new Steganography(image) as any;
  const imageData = steg.getImageData();
  const newImageData = new EncodeDCT().encode(
    imageData,
    steg.width,
    steg.height,
    binaryMessage
  );
  const imageDataSubset = Array.from(
    newImageData.subarray(0, encoded.DCT.length)
  );
  expect(imageDataSubset).toEqual(encoded.DCT.data);
});
