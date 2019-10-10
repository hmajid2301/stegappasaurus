import varint from "varint";

export default class DecodeLSB {
  private pixelIndex: number;

  constructor() {
    this.pixelIndex = 0;
  }

  public decode(imageData: Uint8ClampedArray, startDecodingAt = 0) {
    this.pixelIndex = startDecodingAt;
    const messageLength = this.getMessageLength(imageData);
    const binaryMessage: string[] = [];

    for (let i = 0; i < messageLength; i += 1) {
      const byte = this.decodeNextByte(imageData);
      binaryMessage.push(byte);
    }
    return binaryMessage;
  }

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

  public decodeNextByte(imageData: Uint8ClampedArray) {
    let byte = "";

    for (let j = 0; j < 8; j += 1) {
      const currentPixel = imageData[this.pixelIndex];
      let lsb = "0";
      if (currentPixel % 2 === 1) {
        lsb = "1";
      }
      byte += lsb;

      this.pixelIndex += 1;
      if ((this.pixelIndex + 1) % 1 === 0) {
        this.pixelIndex += 1;
      }
    }
    return byte;
  }

  public getCurrentIndex() {
    return this.pixelIndex;
  }

  private getMessageLength(imageData: Uint8ClampedArray) {
    const messageVarint: number[] = this.decodeVarint(imageData);
    const messageLength = varint.decode(messageVarint);
    return messageLength;
  }
}
