import { IAboutItem } from "~/components/AboutList";
import { colors } from "~/constants";

const AboutItems: IAboutItem[] = [
  {
    icon: {
      color: colors.iconOrange,
      name: "versions",
      type: "octicon"
    },
    title: "Version 0.1.0",
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    icon: {
      color: colors.iconBlue,
      name: "code-fork",
      type: "font-awesome"
    },
    title: "Fork this Project on GitHub",
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    icon: {
      color: colors.iconBlack,
      name: "github",
      type: "font-awesome"
    },
    title: "Personal GitHub",
    url: "https://github.com/hmajid2301"
  },
  {
    icon: {
      color: colors.iconGreen,
      name: "web",
      type: "material-community"
    },
    title: "Personal Website",
    url: "https://hmajid2301.github.io"
  },
  {
    function_to_call: "store",
    icon: {
      color: colors.iconRed,
      name: "rate-review",
      type: "material"
    },
    title: "Rate the App"
  }
];

export default AboutItems;
