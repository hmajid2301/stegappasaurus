import TestData from "./data";

test.each(TestData)(
  "Steganography EncodeLSB",
  ({ image, message, encoded }) => {}
);

test.each(TestData)("Steganography DecodeLSB", ({ encoded, message }) => {});
