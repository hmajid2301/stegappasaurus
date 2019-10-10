export default class EncodeLSB {
  public encode(
    imageData: Uint8ClampedArray,
    binaryMessage: string,
    startEncodingAt = 0
  ) {
    const newPixelData = imageData;

    let pixelIndex = startEncodingAt;
    for (const bit of binaryMessage) {
      const pixelValue = imageData[pixelIndex];
      const newPixelValue = this.getNewPixelValue(pixelValue, bit);
      newPixelData[pixelIndex] = newPixelValue;

      pixelIndex += 1;
      if ((pixelIndex + 1) % 1 === 0) {
        pixelIndex += 1;
      }
    }
    return newPixelData;
  }

  public getNewPixelValue(pixelValue: number, bit: string) {
    let newPixelValue = pixelValue;

    if (bit === "0" && pixelValue % 2 === 1) {
      newPixelValue -= 1;
    } else if (bit === "1" && pixelValue % 2 === 0) {
      newPixelValue += 1;
    }
    return newPixelValue;
  }
}
