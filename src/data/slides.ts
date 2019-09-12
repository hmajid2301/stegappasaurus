import { ISlide } from "~/components/IntroSlider";

const slides: ISlide[] = [
  {
    color: "#06C49C",
    image: require("~/assets/images/slider/1.jpg"),
    key: "encoding",
    text: "Hide your data within images.",
    title: "Hide data. "
  },
  {
    color: "#129FDD",
    image: require("~/assets/images/slider/2.jpg"),
    key: "share",
    text: "Then share the encoded images with your friends.",
    title: "Share your images"
  },
  {
    color: "#643FEA",
    image: require("~/assets/images/slider/3.jpg"),
    key: "decoding",
    text: "Finally use this app to retrieve your hidden data from the image.",
    title: "Retrieve hidden data"
  }
];

export default slides;
