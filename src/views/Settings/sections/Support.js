import {
  List,
  ListItem,
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

import { License, PrivatePolicy, TermsOfUse } from './modals';

import styles from './styles';


const Support = ({ theme }) => (
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

Support.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default Support;
