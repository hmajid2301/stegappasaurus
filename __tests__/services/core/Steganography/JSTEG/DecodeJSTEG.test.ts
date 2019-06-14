import { Steganography } from "../../../../../src/services/core";
import { DecodeJSTEG } from "../../../../../src/services/core/Steganography/JSTEG";
import data from "../data";

test.each(data)("DecodeJSTEG", ({ encoded, decodedData }) => {
  const steg = new Steganography(encoded.JSTEG.image) as any;
  const imageData = steg.getImageData();
  const binaryMessage = new DecodeJSTEG(encoded.JSTEG.limit).decode(
    imageData,
    steg.width,
    steg.height
  );
  expect(binaryMessage).toEqual(decodedData);
});
