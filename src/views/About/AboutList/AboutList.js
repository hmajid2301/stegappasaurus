import { StoreReview, WebBrowser } from 'expo';
import { Body, Button, Icon, Left, List, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';


const chooseFunction = (item) => {
  switch (item.function) {
    case 'browser':
      WebBrowser.openBrowserAsync(item.url);
      break;

    case 'store':
      StoreReview.requestReview();
      break;

    default:
      break;
  }
};

const renderListItem = (item, color) => (
  <ListItem icon key={item.title}>
    <Left>
      <Button onPress={() => chooseFunction(item)} style={{ backgroundColor: item.color }}>
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

const AboutList = ({ color, icons }) => (
  <List>
    {
      icons.map(item => (
        renderListItem(item, color)
      ))
    }
  </List>
);

AboutList.propTypes = {
  color: PropTypes.string.isRequired,
  icons: PropTypes.array.isRequired,
};

export default AboutList;
