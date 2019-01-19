import PropTypes from 'prop-types';
import React from 'react';
import { Header, Left, Body, Icon } from 'native-base';

import Logo from '../Logo';
import styles from './styles';


const CustomHeader = ({ navigation, color }) => (
  <Header style={styles(color).container}>
    <Left>
      <Icon
        style={styles(color).icons}
        name='menu'
        onPress={() => navigation.openDrawer()}
        type='SimpleLineIcons'
      />
    </Left>
    <Body>
      <Logo />
    </Body>
  </Header>
);

CustomHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

export default CustomHeader;
