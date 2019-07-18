import { Steganography } from "../../../../src/services/core";
import TestData from "./data";

test.each(TestData)(
  "Steganography EncodeLSB",
  ({ image, message, encoded }) => {
    const encodedBase64 = new Steganography(image).encode(message, "LSB");
    expect(encodedBase64).toStrictEqual(encoded.LSB.image);
  }
);

test.each(TestData)("Steganography DecodeLSB", ({ encoded, message }) => {
  const decodedMessage = new Steganography(encoded.LSB.image).decode();
  expect(decodedMessage).toStrictEqual(message);
});
