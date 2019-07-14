import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import Rate, { AndroidMarket } from "react-native-rate";

import { BackgroundColors, ThemeColors } from "@types";
import styles from "./styles";

interface IProps {
  items: IAboutItem[];
  backgroundColor: BackgroundColors;
  color: ThemeColors;
}

export interface IAboutItem {
  title: string;
  function_to_call?: "browser" | "store";
  icon: {
    color: string;
    name: string;
    type:
      | "material"
      | "material-community"
      | "font-awesome"
      | "octicon"
      | "ionicon"
      | "foundation"
      | "evilicon"
      | "simple-line-icon"
      | "zocial"
      | "entypo"
      | "feather"
      | "antdesign";
  };
  url?: string;
}

const AboutList = ({ backgroundColor, color, items }: IProps) => (
  <View>{items.map(item => renderListItem(backgroundColor, color, item))}</View>
);

const renderListItem = (
  backgroundColor: BackgroundColors,
  color: ThemeColors,
  item: IAboutItem
) => (
  <ListItem
    containerStyle={{ backgroundColor }}
    key={item.title}
    leftIcon={{
      ...item.icon,
      onPress: () => chooseFunction(item)
    }}
    topDivider={true}
    bottomDivider={true}
    title={
      <TouchableOpacity onPress={() => chooseFunction(item)}>
        <Text style={[styles.text, { color }]}>{item.title}</Text>
      </TouchableOpacity>
    }
  />
);

const chooseFunction = (item: IAboutItem) => {
  switch (item.function_to_call) {
    case "store":
      const options = {
        GooglePackageName: "com.stegappasaurus",
        openAppStoreIfInAppFails: true,
        preferredAndroidMarket: AndroidMarket.Google
      };
      Rate.rate(options, () => null);
      break;

    default:
      if (item.url !== undefined) {
        WebBrowser.openBrowserAsync(item.url)
          .then()
          .catch();
      }
      break;
  }
};

export default AboutList;
