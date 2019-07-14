import { Steganography } from "../../../../../src/services/core";
import { EncodeJSTEG } from "../../../../../src/services/core/Steganography/JSTEG";
import data from "../data";

test.each(data)("EncodeJSTEG", ({ binaryMessage, image, encoded }) => {
  const steg = new Steganography(image) as any;
  const imageData = steg.getImageData();
  let startEncodingAt = 8 + Math.ceil(Math.log2(encoded.JSTEG.limit) / 8) * 8;
  startEncodingAt += Math.floor(startEncodingAt / 4);
  const newImageData = new EncodeJSTEG(encoded.JSTEG.limit).encode(
    imageData,
    steg.width,
    steg.height,
    binaryMessage,
    startEncodingAt
  );
  const imageDataSubset = Array.from(
    newImageData.subarray(0, encoded.JSTEG.length)
  );

  expect(imageDataSubset).toEqual(encoded.JSTEG.data);
});
