import varint from "varint";

export default class DecodeLSB {
  /** The index to start decoding the next byte from. */
  private pixelIndex: number;

  constructor() {
    this.pixelIndex = 0;
  }

  /**
   * Acts a main function decodes binary message from image data. **Note**: alpha channel is
   * ignored, so only Red Green Blue (RGB) channels are actually decoded from. The encoded data
   * contains the message length which is how many characters were encoded. This is then followed
   * by the actual encoded data, we need to look at 8 bytes (RGB) and get their LSB to get
   * one.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @param startDecodingAt: Index to start decoding at.
   *
   * @return The decoded binary message as a string.
   */
  public decode = (imageData: Uint8ClampedArray, startDecodingAt = 0) => {
    this.pixelIndex = startDecodingAt;
    const messageLength = this.getMessageLength(imageData);
    const binaryMessage: string[] = [];

    for (let i = 0; i < messageLength; i += 1) {
      const byte = this.decodeNextByte(imageData);
      binaryMessage.push(byte);
    }
    return binaryMessage;
  };

  public decodeVarint(imageData: Uint8ClampedArray) {
    let completed = false;
    const messageVarint: number[] = [];
    while (!completed) {
      const byte = this.decodeNextByte(imageData);
      const num = parseInt(byte, 2);
      messageVarint.push(num);
      if (messageVarint.slice(-1)[0] < 128) {
        completed = true;
      }
    }
    return messageVarint;
  }

  /**
   * Gets the next byte of encoded data, since everything is encoded as ASCII strings. This will
   * be one character. So for example `u` would be `117` in decimal and the returned byte would
   * be `01110101` (pad front with 0s until we have a byte).
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @return The decoded (next) byte.
   */
  public decodeNextByte = (imageData: Uint8ClampedArray) => {
    let byte = "";

    for (let j = 0; j < 8; j += 1) {
      const currentPixel = imageData[this.pixelIndex];
      let lsb = "0";
      if (currentPixel % 2 === 1) {
        lsb = "1";
      }
      byte += lsb;

      this.pixelIndex += 1;
      if ((this.pixelIndex + 1) % 4 === 0) {
        this.pixelIndex += 1;
      }
    }
    return byte;
  };

  /**
   * Gets the index of the next pixel we will decode.
   *
   * @return The index of the next pixel to decode.
   */
  public getCurrentIndex = () => {
    return this.pixelIndex;
  };

  /**
   * Gets the message length at the front of the image data (top left data). It will stop looking
   * after the message is less < 128. The message length is encoded using varint 128, same as in
   * Google's proto buffers. If the MSB (most significant bit) is not set to 1 (i.e. value < 128),
   * then this means there aren't any more values to decode.
   *
   * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
   * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
   *
   * @return The message length in decimal.
   */
  private getMessageLength = (imageData: Uint8ClampedArray) => {
    const messageVarint: number[] = this.decodeVarint(imageData);
    const messageLength = varint.decode(messageVarint);
    return messageLength;
  };
}
