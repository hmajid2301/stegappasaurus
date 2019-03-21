import Steganography from "../../src/services/steganography";
import data from "./data";

test.each(data)(
  "Steganography EncodeLSB",
  ({ imageData, message, encodedData }) => {
    const newPixelData = new Steganography("LSB-PNG", imageData).encode(
      message
    );
    expect(newPixelData).toEqual(encodedData.LSB);
  }
);

test.each(data)("Steganography DecodeLSB", ({ imageData, decodedString }) => {
  const decodedMessage = new Steganography("LSB-PNG", imageData).decode();
  expect(decodedMessage).toEqual(decodedString);
});
