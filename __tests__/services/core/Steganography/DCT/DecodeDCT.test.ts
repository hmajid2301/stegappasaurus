import { Steganography } from "../../../../../src/services/core";
import { DecodeDCT } from "../../../../../src/services/core/Steganography/DCT";
import data from "../data";

test.each(data)("DecodeDCT", ({ encoded, decodedData }) => {
  const steg = new Steganography(encoded.DCT.image) as any;
  const imageData = steg.getImageData();
  const binaryMessage = new DecodeDCT().decode(
    imageData,
    steg.width,
    steg.height
  );
  expect(binaryMessage).toEqual(decodedData);
});
