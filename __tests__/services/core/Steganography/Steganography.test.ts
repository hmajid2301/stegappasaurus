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

test.each(data)("Steganography EncodeJSTEG", ({ image, message, encoded }) => {
  const encodedBase64 = new Steganography(image).encode(message, "JSTEG");
  expect(encodedBase64).toStrictEqual(encoded.JSTEG.image);
});

test.each(data)("Steganography DecodeJSTEG", ({ encoded, message }) => {
  const decodedMessage = new Steganography(encoded.JSTEG.image).decode();
  expect(decodedMessage).toStrictEqual(message);
});

test.each(data)("Steganography EncodeF5", ({ image, message, encoded }) => {
  const encodedBase64 = new Steganography(image).encode(message, "F5", {
    password: encoded.F5.password
  });
  expect(encodedBase64).toStrictEqual(encoded.F5.image);
});

test.each(data)("Steganography DecodeF5", ({ encoded, message }) => {
  const decodedMessage = new Steganography(encoded.F5.image).decode();
  expect(decodedMessage).toStrictEqual(message);
});
