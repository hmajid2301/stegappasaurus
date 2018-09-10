export default class EncodeLSB {
  encode(imageData, binaryMessage) {
    const newPixelData = [];
    let pixelIndex = 0;

    binaryMessage.forEach((character) => {
      character.forEach((binaryValue) => {
        const pixelValue = imageData[pixelIndex];
        const newPixelValue = this.getNewPixelValue(pixelValue, binaryValue);
        newPixelData[pixelIndex] = newPixelValue;

        pixelIndex += 1;
        if (pixelIndex % 4 === 0) {
          newPixelData[pixelIndex] = 255;
          pixelIndex += 1;
        }
      });
    });
    return newPixelData;
  }

  getNewPixelValue(pixelValue, messageValue) {
    let newPixelValue = pixelValue;

    if (messageValue === '0') {
      if (pixelValue % 2 === 1) {
        newPixelValue += 1;
      }
    } else if (messageValue === '1') {
      if (pixelValue % 2 === 0) {
        newPixelValue -= 1;
      }
    }

    return newPixelValue;
  }
}

