import { IAboutItem } from "~/components/AboutList";
import { colors } from "~/modules";

import PackageJson from "../../package.json";
const about: IAboutItem[] = [
  {
    icon: {
      color: colors.primary,
      name: "versions",
      type: "octicon"
    },
    title: `Version ${PackageJson.version}`,
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    icon: {
      color: colors.primary,
      name: "code-fork",
      type: "font-awesome"
    },
    title: "Fork this Project on GitHub",
    url: "https://github.com/hmajid2301/Stegappasaurus"
  },
  {
    icon: {
      color: colors.primary,
      name: "gitlab",
      type: "font-awesome"
    },
    title: "Personal GitLab",
    url: "https://gitlab.com/hmajid2301"
  },
  {
    icon: {
      color: colors.primary,
      name: "web",
      type: "material-community"
    },
    title: "Personal Website",
    url: "https://haseebmajid.dev"
  },
  {
    function_to_call: "store",
    icon: {
      color: colors.primary,
      name: "rate-review",
      type: "material"
    },
    title: "Rate the App"
  }
];

export default about;
