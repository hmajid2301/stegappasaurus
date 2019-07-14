/**
 * Converts the RGBA image data into a 3D array which contains the DCT coefficients of the
 *
 * * For each pixel convert it to ycbcr (from rgba)
 * * Run 2D DCT on ycbcr data
 *
 * @param imageData: An array where numbers range from 0 - 255 (1 byte). In the order of Red \
 * Green Blue Alpha (repeating), like output from `canvas.getImageData()`.
 *
 * @param width: Image width in pixels.
 *
 * @param height: Image height in pixels.
 *
 * @return A 3D array containing the DCT coefficient for the image data.
 * Where the dimensions 3 Dimensions are;
 * * 1st: One for each pixel
 * * 2nd: The 64 DCT Coefficients (8 x 8)
 * * 3rd: YCbCr components (3, Y Cb Cr)
 */
export const convertImageDataToDCT = (
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  blockSize = 8
) => {
  const wMax = Math.floor(width / blockSize);
  const hMax = Math.floor(height / blockSize);
  const result: number[][][] = [];

  for (let h = 0; h < hMax; h += 1) {
    for (let w = 0; w < wMax; w += 1) {
      const tmp: number[][] = [];

      for (let i = 0; i < blockSize; i += 1) {
        for (let j = 0; j < blockSize; j += 1) {
          const red =
            imageData[((h * blockSize + i) * width + w * blockSize + j) * 4];
          const green =
            imageData[
              ((h * blockSize + i) * width + w * blockSize + j) * 4 + 1
            ];
          const blue =
            imageData[
              ((h * blockSize + i) * width + w * blockSize + j) * 4 + 2
            ];
          const ycbcr = rgbToYCbCr(red, green, blue);
          tmp.push(ycbcr);
        }
      }
      result.push(dct(tmp));
    }
  }
  return result;
};

/**
 * Converts our r (red) g (green) b (blue) into Y (luma) Cb (blue minus luma) Cr (red minus luma)
 * components, another way to represent image data. We need this because the 2D DCT algorithm
 * expects the data to be in YcBcR format.
 *
 * @param red: The red component of the pixel.
 *
 * @param green: The green component of the pixel.
 *
 * @param blue: The blue component of the pixel.
 *
 * @return An array containing the YCbCr components of the image (one element for each component).
 */
const rgbToYCbCr = (red: number, green: number, blue: number) => {
  const result = [];
  result.push(0.299 * red + 0.587 * green + 0.114 * blue);
  result.push(128 - 0.168736 * red - 0.331264 * green + 0.5 * blue);
  result.push(128 + 0.5 * red - 0.418688 * green - 0.081312 * blue);
  return result;
};

/**
 * Applies the discrete cosine transformation to our (image) data. We are using the `DCT II`,
 * algorithm.
 *
 * @param data: The ycbcr data (for each pixel).
 *
 * @return An 3D array, where the dimensions 3 Dimensions are;
 * * 1st: One for each pixel
 * * 2nd: The 64 DCT Coefficients (8 x 8)
 * * 3rd: YCbCr components (3, Y Cb Cr)
 */
const dct = (data: number[][]) => {
  const result: number[][] = [];
  for (let i = 0; i < 64; i += 1) {
    result.push([]);
  }

  for (let channel = 0; channel < 3; channel += 1) {
    for (let u = 0; u < 8; u += 1) {
      const cu = u === 0 ? 1 / Math.sqrt(2) : 1;
      for (let v = 0; v < 8; v += 1) {
        const cv = v === 0 ? 1 / Math.sqrt(2) : 1;
        let sum = 0;

        for (let x = 0; x < 8; x += 1) {
          for (let y = 0; y < 8; y += 1) {
            sum +=
              data[x * 8 + y][channel] *
              Math.cos(((2 * x + 1) * u * Math.PI) / 16) *
              Math.cos(((2 * y + 1) * v * Math.PI) / 16);
          }
        }
        result[u * 8 + v].push((1 / 4) * cu * cv * sum);
      }
    }
  }

  return result;
};

/**
 * Converts our ycbcr DCT data back into an Uint8ClampedArray (image data).
 *
 * * Run idct on each pixel
 * * For each pixel convert it from ycbcr to rgba
 *
 * @param dctData: The DCT data which has the coefficients for each pixel and for each component \
 * for each pixel (ycbcr).
 *
 * @param width: Image width in pixels.
 *
 * @param height: Image height in pixels.
 *
 * @return An Uint8ClampedArray, containing the image data.
 */
export const convertDCTToImageData = (
  dctData: number[][][],
  width: number,
  height: number
) => {
  const blockSize = 8;
  const wMax = Math.floor(width / blockSize);
  const hMax = Math.floor(height / blockSize);
  const imageData = new Uint8ClampedArray(width * height * 4);
  let count = 0;

  for (let h = 0; h < hMax; h += 1) {
    for (let w = 0; w < wMax; w += 1) {
      const tmp = idct(dctData[count]);

      for (let i = 0; i < blockSize; i += 1) {
        for (let j = 0; j < blockSize; j += 1) {
          const y = tmp[i * blockSize + j][0];
          const cb = tmp[i * blockSize + j][1];
          const cr = tmp[i * blockSize + j][2];
          const rgb = ycbcrToRGB(y, cb, cr);

          for (let channel = 0; channel < 3; channel++) {
            imageData[
              ((h * blockSize + i) * width + w * blockSize + j) * 4 + channel
            ] = normalise(rgb[channel]);
          }
        }
      }
      count += 1;
    }
  }

  for (let i = 0; i < imageData.length; i += 4) {
    imageData[i + 3] = 255;
  }
  return imageData;
};

/**
 * Applies the inverse discrete cosine transformation to our (image) data. We are using the `IDCT II`,
 * algorithm.
 *
 * @param data: The DCT coefficient ycbcr data (for each pixel).
 *
 * @return An 2D array, where the dimensions 2 Dimensions are;
 * * 1st: One for each pixel
 * * 2nd: YCbCr components (Y Cb Cr)
 */
const idct = (data: number[][]) => {
  const result: number[][] = [];
  for (let i = 0; i < 64; i += 1) {
    result.push([]);
  }

  for (let channel = 0; channel < 3; channel += 1) {
    for (let x = 0; x < 8; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        let sum = 0;

        for (let u = 0; u < 8; u += 1) {
          const cu = u === 0 ? 1 / Math.sqrt(2) : 1;
          for (let v = 0; v < 8; v += 1) {
            const cv = v === 0 ? 1 / Math.sqrt(2) : 1;
            sum +=
              cu *
              cv *
              data[u * 8 + v][channel] *
              Math.cos(((2 * x + 1) * u * Math.PI) / 16) *
              Math.cos(((2 * y + 1) * v * Math.PI) / 16);
          }
        }
        result[x * 8 + y].push((1 / 4) * sum);
      }
    }
  }

  return result;
};

/**
 * Converts our  Y (luma) Cb (blue minus luma) Cr (red minus luma) into r (red) g (green) b (blue)
 * components, another way to represent image data. We need this because canvas expects the data to be
 * in RGB(A) format.
 *
 * @param y: The luma component of the pixel.
 *
 * @param cb: The luma minus blue component of the pixel.
 *
 * @param cr: The luma minus red component of the pixel.
 *
 * @return An array containing the RGB components of the image (one element for each component).
 */
const ycbcrToRGB = (y: number, cb: number, cr: number) => {
  const result = [];
  result.push(y + 1.402 * (cr - 128));
  result.push(y - 0.344136 * (cb - 128) - 0.714136 * (cr - 128));
  result.push(y + 1.772 * (cb - 128));
  return result;
};

/**
 * Normalises the pixel data, it has to be an integers between (0 - 255) for each components,
 * R, G, B cannot be say 256, -1 or 24.5.
 *
 * @param pixelData: The pixel data to normalise.
 *
 * @return The normalises pixel data, an integer between 0 - 255 (1 byte).
 */
const normalise = (pixelData: number) => {
  pixelData = Math.round(pixelData);
  if (pixelData > 255) {
    pixelData = 255;
  } else if (pixelData < 0) {
    pixelData = 0;
  }

  return pixelData;
};
