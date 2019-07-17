import { createCanvas, Image } from "canvas";
import fs from "fs";
import sizeOf from "image-size";

const convertToBase64 = (img: string) => {
  const base64Image = fs.readFileSync(`${__dirname}/${img}`, "base64");
  return `data:image/png;base64,${base64Image}`;
};

const getImageData = (uri: string) => {
  const base64 = convertToBase64(uri);
  const base64Image = Buffer.from(base64.substr(22), "base64");
  const dimensions = sizeOf(base64Image);
  const canvas = createCanvas(dimensions.width, dimensions.height);
  const ctx = canvas.getContext("2d", { alpha: false });

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };

  img.src = base64;
  const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
  return imageData.data;
};

const TestData = [
  {
    binaryMessage: "0000000101000001",
    data: getImageData("images/black.png"),
    decoded: ["01000001"],
    encoded: {
      JSTEG: {
        image: convertToBase64("images/encoded/JSTEG/black.png"),
        limit: 15
      },

      F5: {
        image: convertToBase64("images/encoded/F5/black.png"),
        limit: 15,
        password: "abcd1234"
      },

      LSB: {
        image: convertToBase64("images/encoded/LSB/black.png")
      }
    },
    height: 64,
    image: convertToBase64("images/black.png"),
    message: "A",
    width: 64
  }
];

export default TestData;
