import PropTypes from 'prop-types';
import React from 'react';
import { Header, Left, Body, Icon } from 'native-base';

import Logo from '../Logo';
import styles from './styles';


const CustomHeader = ({ navigation, color, theme }) => (
  <Header
    style={[styles.container, { borderBottomColor: color, backgroundColor: theme.backgroundColor }]}
  >
    <Left>
      <Icon
        style={{ color: theme.color }}
        name='menu'
        onPress={() => navigation.openDrawer()}
        type='SimpleLineIcons'
      />
    </Left>
    <Body>
      <Logo theme={theme}/>
    </Body>
  </Header>
);

CustomHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default CustomHeader;
