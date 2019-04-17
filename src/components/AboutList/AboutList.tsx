import { StoreReview, WebBrowser } from "expo";
import { Body, Button, Icon, Left, List, ListItem } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { ThemeColors } from "~/common/interfaces";
import styles from "./styles";

interface IProps {
  items: IAboutItem[];
  color: ThemeColors;
}

export interface IAboutItem {
  title: string;
  color: string;
  function_to_call?: "store";
  icon: {
    name: string;
    type:
      | "AntDesign"
      | "Entypo"
      | "EvilIcons"
      | "Feather"
      | "FontAwesome"
      | "FontAwesome5"
      | "Foundation"
      | "Ionicons"
      | "MaterialCommunityIcons"
      | "MaterialIcons"
      | "Octicons"
      | "SimpleLineIcons"
      | "Zocial";
  };
  url: string;
}

const AboutList = ({ color, items }: IProps) => (
  <List>{items.map(item => renderListItem(color, item))}</List>
);

const renderListItem = (color: string, item: IAboutItem) => (
  <ListItem icon key={item.title}>
    <Left>
      <Button
        onPress={() => chooseFunction(item)}
        style={{ backgroundColor: item.color }}
      >
        <Icon {...item.icon} />
      </Button>
    </Left>
    <Body>
      <TouchableOpacity onPress={() => chooseFunction(item)}>
        <Text style={[styles.text, { color }]}>{item.title}</Text>
      </TouchableOpacity>
    </Body>
  </ListItem>
);

const chooseFunction = (item: IAboutItem) => {
  switch (item.function_to_call) {
    case "store":
      StoreReview.requestReview()
        .then()
        .catch();
      break;

    default:
      WebBrowser.openBrowserAsync(item.url)
        .then()
        .catch();
      break;
  }
};

export default AboutList;
