import fs from "fs";

const convertToBase64 = (img: string) => {
  const base64Image = fs.readFileSync(`${__dirname}/${img}`, "base64");
  return `data:image/png;base64,${base64Image}`;
};

const getImageData = (uri: string) => {
  const a = uri;
};

const TestData = [
  {
    binaryMessage: "0000000101000001",
    data: getImageData("images/black.png"),
    decoded: ["01000001"],
    encoded: {
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
