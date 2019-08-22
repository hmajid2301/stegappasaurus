import { IAboutItem } from "~/components/AboutList";
import { colors } from "~/modules";

const about: IAboutItem[] = [
  {
    icon: {
      color: colors.primary,
      name: "versions",
      type: "octicon"
    },
    title: "Version 0.1.0",
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    icon: {
      color: colors.pink,
      name: "code-fork",
      type: "font-awesome"
    },
    title: "Fork this Project on GitHub",
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    icon: {
      color: colors.orange,
      name: "gitlab",
      type: "font-awesome"
    },
    title: "Personal GitLab",
    url: "https://gitlab.com/hmajid2301"
  },
  {
    icon: {
      color: colors.green,
      name: "web",
      type: "material-community"
    },
    title: "Personal Website",
    url: "https://hmajid2301.github.io"
  },
  {
    function_to_call: "store",
    icon: {
      color: colors.red,
      name: "rate-review",
      type: "material"
    },
    title: "Rate the App"
  }
];

export default about;
