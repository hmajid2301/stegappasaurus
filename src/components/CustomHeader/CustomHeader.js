import { Body, Header, Icon, Left } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';

import Logo from '~/components/Logo';
import styles from './styles';


const CustomHeader = ({ navigation, primaryColor, theme }) => (
  <Header
    style={[styles.container,
    { borderBottomColor: primaryColor, backgroundColor: theme.background }]}
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
  navigation: PropTypes.object.isRequired,
  primaryColor: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    isDark: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

export default CustomHeader;
