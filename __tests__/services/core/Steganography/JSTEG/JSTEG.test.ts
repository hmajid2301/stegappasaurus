import {
  DecodeJSTEG,
  EncodeJSTEG
} from "../../../../../src/services/core/Steganography/JSTEG";
import TestData from "../data";

test.each(TestData)(
  "Encode and Decode JSTEG",
  ({ binaryMessage, data, encoded, decoded, height, width }) => {
    let startEncodingAt = 8 + Math.ceil(Math.log2(encoded.JSTEG.limit) / 8) * 8;
    startEncodingAt += Math.floor(startEncodingAt / 4) + 1;
    const newImageData = new EncodeJSTEG(encoded.JSTEG.limit).encode(
      data,
      width,
      height,
      binaryMessage,
      startEncodingAt
    );

    const message = new DecodeJSTEG(encoded.JSTEG.limit).decode(
      newImageData,
      width,
      height
    );
    expect(message).toEqual(decoded);
  }
);
