import { IAboutItem } from "~/components/AboutList";
import { colors } from "~/util/styles";

const AboutItems: IAboutItem[] = [
  {
    color: colors.iconOrange,
    icon: {
      name: "versions",
      type: "Octicons"
    },
    title: "Version 0.1.0",
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    color: colors.iconBlue,
    icon: {
      name: "code-fork",
      type: "FontAwesome"
    },
    title: "Fork this Project on GitHub",
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    color: colors.iconBlack,
    icon: {
      name: "github",
      type: "FontAwesome"
    },
    title: "Personal GitHub",
    url: "https://github.com/hmajid2301"
  },
  {
    color: colors.iconGreen,
    icon: {
      name: "web",
      type: "MaterialCommunityIcons"
    },
    title: "Personal Website",
    url: "https://hmajid2301.github.io"
  },
  {
    color: colors.iconRed,
    function: "store",
    icon: {
      name: "rate-review",
      type: "MaterialIcons"
    },
    title: "Rate the App",
    url: "https://hmajid2301.github.io"
  }
];

export default AboutItems;
