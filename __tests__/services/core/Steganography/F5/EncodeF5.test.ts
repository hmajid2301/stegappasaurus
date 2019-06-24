import { Steganography } from "../../../../../src/services/core";
import { EncodeF5 } from "../../../../../src/services/core/Steganography/F5";
import data from "../data";

test.each(data)("EncodeF5", ({ binaryMessage, image, encoded }) => {
  const steg = new Steganography(image) as any;
  const imageData = steg.getImageData();
  let startEncodingAt =
    8 +
    Math.ceil(Math.log2(encoded.F5.limit) / 8) * 8 +
    encoded.F5.password.length * 8;
  startEncodingAt += Math.floor(startEncodingAt / 4);

  const newImageData = new EncodeF5(
    encoded.F5.limit,
    encoded.F5.password
  ).encode(imageData, steg.width, steg.height, binaryMessage, startEncodingAt);
  const imageDataSubset = Array.from(
    newImageData.subarray(0, encoded.F5.length)
  );

  expect(imageDataSubset).toEqual(encoded.F5.data);
});
