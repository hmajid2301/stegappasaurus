import { ISlide } from "@types";

const slides: ISlide[] = [
  {
    color: "#06C49C",
    image: require("~/assets/images/slider/1.jpg"),
    key: "encoding",
    text:
      "Hide your text data within images. The image looks exactly the same to the naked eye.",
    title: "Hide data in images"
  },
  {
    color: "#129FDD",
    image: require("~/assets/images/slider/2.jpg"),
    key: "share",
    text:
      "After hiding data with in your images you can them share them with your friends.",
    title: "Share your images"
  },
  {
    color: "#643FEA",
    image: require("~/assets/images/slider/3.jpg"),
    key: "decoding",
    text:
      "Then use this app to retrieve your hidden data from the encoded image.",
    title: "Retrieve hidden data"
  }
];

export default slides;
