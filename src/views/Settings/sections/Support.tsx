import { List, ListItem } from "native-base";
import React from "react";
import { Text } from "react-native";

import { License, PrivatePolicy, TermsOfUse } from "./modals";

import styles from "./styles";

interface IProps {
  theme: {
    background: string;
    color: string;
    isDark: boolean;
  };
}
const Support = ({ theme }: IProps) => (
  <List>
    <ListItem itemHeader style={styles.itemHeader}>
      <Text style={styles.itemHeaderText}>Support</Text>
    </ListItem>

    <ListItem noIndent>
      <PrivatePolicy />
    </ListItem>

    <ListItem noIndent>
      <TermsOfUse />
    </ListItem>

    <ListItem noIndent>
      <License />
    </ListItem>
  </List>
);

export default Support;
