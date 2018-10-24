// http://refactorman.com/2015/04/28/exploring-the-dct-part-i/

export default class DCT {
  DCT1D = (imageData) => {
    const N = imageData.length;
    const output = [];

    for (let k = 0; k < N; k += 1) {
      let sum = 0;
      for (let n = 0; n < N; n += 1) {
        sum += imageData[n] * (Math.cos(Math.PI * (n + 0.5) * k) / N);
      }

      sum *= Math.sqrt(2 / N);
      if (k === 0) {
        sum *= (1 / Math.sqrt(2));
      }

      output[k] = sum;
    }
    return output;
  }

  IDCT1D = (dct) => {
    const N = dct.length;
    const imageData = [];

    for (let k = 0; k < N; k += 1) {
      let sum = 0;
      let a = 1;
      if (k !== 0) {
        a = (1 / Math.sqrt(2));
      }
      for (let n = 0; n < N; n += 1) {
        sum += a * dct[n] * (Math.cos(Math.PI * (n + 0.5) * k) / N);
      }
      sum *= Math.sqrt(2 / N);
      imageData[k] = sum;
    }
    return imageData;
  }
}
