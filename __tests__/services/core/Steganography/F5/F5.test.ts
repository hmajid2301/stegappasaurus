import {
  DecodeF5,
  EncodeF5
} from "../../../../../src/services/core/Steganography/F5";
import TestData from "../data";

test.each(TestData)(
  "Encodeand Decode F5",
  ({ binaryMessage, data, encoded, decoded, height, width }) => {
    let startEncodingAt =
      8 +
      Math.ceil(Math.log2(encoded.F5.limit) / 8) * 8 +
      encoded.F5.password.length * 8;
    startEncodingAt += Math.floor(startEncodingAt / 4) + 1;

    const newImageData = new EncodeF5(
      encoded.F5.limit,
      encoded.F5.password
    ).encode(data, width, height, binaryMessage, startEncodingAt);

    const message = new DecodeF5(encoded.F5.limit, encoded.F5.password).decode(
      newImageData,
      width,
      height
    );
    expect(message).toEqual(decoded);
  }
);
