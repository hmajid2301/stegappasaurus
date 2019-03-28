import Steganography from "../../src/services/steganography";
import data from "./data";

test.each(data)(
  "Steganography EncodeLSB",
  ({ image, message, encodedImage }) => {
    const encodedBase64 = new Steganography("LSB-PNG", image).encode(message);
    expect(encodedBase64).toEqual(encodedImage.base64Image);
  }
);

test.each(data)(
  "Steganography DecodeLSB",
  ({ encodedImage, decodedString }) => {
    const decodedMessage = new Steganography("LSB-PNG", encodedImage).decode();
    expect(decodedMessage).toEqual(decodedString);
  }
);
