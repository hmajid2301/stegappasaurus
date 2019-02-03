import {
  Body,
  List,
  ListItem,
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Changelog } from './Modals';

import styles from './styles';


const About = ({ theme }) => (
  <List>

    <ListItem itemHeader style={styles.itemHeader}>
      <Text style={styles.itemHeaderText}>About</Text>
    </ListItem>

    <ListItem noIndent>
      <Changelog />
    </ListItem>

    <ListItem noIndent>
      <Body>
        <TouchableOpacity onPress={() => this.sendEmail()}>
          <Text style={[styles.itemText, { color: theme.color }]}>Email</Text>
          <Text style={[styles.itemText, styles.itemTextUnder]}>me@haseebmajid.com</Text>
        </TouchableOpacity>
      </Body>
    </ListItem>
  </List>
);

About.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default About;
