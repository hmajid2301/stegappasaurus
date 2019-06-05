import { Steganography } from "../../../../src/services/core";
import data from "./data";

test.each(data)("Steganography EncodeLSB", ({ image, message, encoded }) => {
  const encodedBase64 = new Steganography(image).encode(message, "LSB");
  expect(encodedBase64).toStrictEqual(encoded.LSB.image);
});

test.each(data)("Steganography DecodeLSB", ({ encoded, message }) => {
  const decodedMessage = new Steganography(encoded.LSB.image).decode();
  expect(decodedMessage).toStrictEqual(message);
});

test.each(data)("Steganography EncodeDCT", ({ image, message, encoded }) => {
  const encodedBase64 = new Steganography(image).encode(message, "DCT");
  expect(encodedBase64).toStrictEqual(encoded.DCT.image);
});
