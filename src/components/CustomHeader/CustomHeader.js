import { Body, Header, Icon, Left } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';

import Logo from '~/components/Logo';
import styles from './styles';


const CustomHeader = ({ color, navigation, theme }) => (
  <Header
    style={[styles.container, { borderBottomColor: color, backgroundColor: theme.background }]}
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
      <Logo color={theme.color} isDark={theme.isDark}/>
    </Body>
  </Header>
);

CustomHeader.propTypes = {
  color: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default CustomHeader;
