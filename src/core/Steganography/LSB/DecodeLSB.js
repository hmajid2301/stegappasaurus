export default class DecodeLSB {
  decode(imageData, separator) {
    const messageLength = this.getMessageLength(imageData, separator);
    let pixelIndex = messageLength.toString(2).length + separator.length;
    let binaryCharacterList = [];

    for (let i = 0; i < messageLength; i += 1) {
      let binaryCharacter = '';
      for (let j = 0; j < 8; j += 1) {
        binaryCharacter += this.getCurrentPixelLSB(imageData, pixelIndex);

        pixelIndex += 1;
        if (pixelIndex % 4 === 0) {
          pixelIndex += 1;
        }
      }
      binaryCharacterList += binaryCharacter;
    }
    return binaryCharacterList;
  }

  getMessageLength(pixelData, separator) {
    let completed = false;
    let binaryMessageLength = '';
    let pixelIndex = 0;

    while (!completed) {
      const lsb = this.getCurrentPixelLSB(pixelData, pixelIndex);
      binaryMessageLength += lsb;

      if (binaryMessageLength.includes(separator)) {
        binaryMessageLength = binaryMessageLength.replace(separator, '');
        completed = true;
      }

      pixelIndex += 1;
      if (pixelIndex % 4 === 0) {
        pixelIndex += 1;
      }
    }

    const messageLength = parseInt(binaryMessageLength, 2);
    return messageLength;
  }

  getCurrentPixelLSB(pixelData, pixelIndex) {
    const currentPixel = pixelData[pixelIndex];
    let lsb = '0';
    if (currentPixel % 2 === 1) {
      lsb = '1';
    }

    return lsb;
  }
}

