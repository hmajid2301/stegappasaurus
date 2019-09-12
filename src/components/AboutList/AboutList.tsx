import * as React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { IconType, ListItem } from "react-native-elements";
import Rate, { AndroidMarket } from "react-native-rate";

import { ThemeColors } from "~/modules/types";
import styles from "./styles";

interface IProps {
  backgroundColor: ThemeColors;
  color: ThemeColors;
  items: IAboutItem[];
}

export interface IAboutItem {
  title: string;
  function_to_call?: "browser" | "store";
  icon: {
    color: string;
    name: string;
    type: IconType;
  };
  url?: string;
}

const AboutList = ({ backgroundColor, color, items }: IProps) => (
  <View>{items.map(item => renderListItem(backgroundColor, color, item))}</View>
);

const renderListItem = (
  backgroundColor: ThemeColors,
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

const chooseFunction = async (item: IAboutItem) => {
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
        await Linking.openURL(item.url);
      }
      break;
  }
};

export default AboutList;
