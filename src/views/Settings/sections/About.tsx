import { Body, List, ListItem } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { Changelog } from "./modals";

import styles from "./styles";

interface IProps {
  theme: {
    background: string;
    color: string;
    isDark: boolean;
  };
}

const About = ({ theme }: IProps) => (
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
          <Text style={[styles.itemText, styles.itemTextUnder]}>
            me@haseebmajid.com
          </Text>
        </TouchableOpacity>
      </Body>
    </ListItem>
  </List>
);

export default About;
