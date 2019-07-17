import { Steganography } from "../../../../src/services/core";
import TestData from "./data";

test.each(TestData)("Steganography EncodeLSB", ({ image, message, encoded }) => {
  const encodedBase64 = new Steganography(image).encode(message, "LSB");
  expect(encodedBase64).toStrictEqual(encoded.LSB.image);
});

test.each(TestData)("Steganography DecodeLSB", ({ encoded, message }) => {
  const decodedMessage = new Steganography(encoded.LSB.image).decode();
  expect(decodedMessage).toStrictEqual(message);
});

test.each(TestData)("Steganography EncodeJSTEG", ({ image, message, encoded }) => {
  const encodedBase64 = new Steganography(image).encode(message, "JSTEG");
  expect(encodedBase64).toStrictEqual(encoded.JSTEG.image);
});

test.each(TestData)("Steganography DecodeJSTEG", ({ encoded, message }) => {
  const decodedMessage = new Steganography(encoded.JSTEG.image).decode();
  expect(decodedMessage).toStrictEqual(message);
});

test.each(TestData)("Steganography EncodeF5", ({ image, message, encoded }) => {
  const encodedBase64 = new Steganography(image).encode(message, "F5", {
    password: encoded.F5.password
  });
  expect(encodedBase64).toStrictEqual(encoded.F5.image);
});

test.each(TestData)("Steganography DecodeF5", ({ encoded, message }) => {
  const decodedMessage = new Steganography(encoded.F5.image).decode();
  expect(decodedMessage).toStrictEqual(message);
});
