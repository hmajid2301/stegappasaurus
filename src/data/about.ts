import meta from "~/../app.json";
import { IAboutItem } from "~/components/AboutList";
import { colors } from "~/modules";

const about: IAboutItem[] = [
  {
    icon: {
      color: colors.primary,
      name: "versions",
      type: "octicon"
    },
    title: `Version ${meta.version}`,
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
  },
  {
    icon: {
      color: colors.primary,
      name: "paypal",
      type: "font-awesome"
    },
    title: "Buy me a coffee",
    url: "https://www.paypal.me/hmajid2301"
  }
];

export default about;
