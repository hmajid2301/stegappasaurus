import { Steganography } from "../../src/services/core";
import data from "./data";

test.each(data)(
  "Steganography EncodeLSB",
  ({ image, message, encodedImage }) => {
    const encodedBase64 = new Steganography(image).encode(message, "LSB");
    expect(encodedBase64).toEqual(encodedImage.base64Image);
  }
);

test.each(data)("Steganography DecodeLSB", ({ encodedImage, message }) => {
  const decodedMessage = new Steganography(encodedImage).decode();
  expect(decodedMessage).toEqual(message);
});
