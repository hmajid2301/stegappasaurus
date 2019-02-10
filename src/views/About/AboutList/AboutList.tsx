import { StoreReview, WebBrowser } from "expo";
import { Body, Button, Icon, Left, List, ListItem } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

interface IProps {
  icons: Icons[];
  color: string;
}

interface Icons {
  title: string;
  color: string;
  function: string;
  icon: {
    name: string;
    type: string;
  };
  url: string;
}

const chooseFunction = (item: Icons) => {
  switch (item.function) {
    case "browser":
      WebBrowser.openBrowserAsync(item.url)
        .then()
        .catch();
      break;

    case "store":
      StoreReview.requestReview()
        .then()
        .catch();
      break;

    default:
      break;
  }
};

const renderListItem = (color: string, item: Icons) => (
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

const AboutList = ({ color, icons }: IProps) => (
  <List>{icons.map(item => renderListItem(color, item))}</List>
);

export default AboutList;
