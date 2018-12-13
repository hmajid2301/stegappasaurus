import PropTypes from 'prop-types';
import React from 'react';
import { Header, Icon } from 'react-native-elements';

import Logo from '../Logo';
import styles from './styles';


const CustomHeader = ({ navigation, color }) => (
  <Header
    leftComponent={<Icon name='menu' type='simple-line-icon' color={styles(color).icons.color} onPress={() => navigation.openDrawer()}/>}
    centerComponent={<Logo />}
    outerContainerStyles={styles(color).outerHeaderContainer}
    innerContainerStyles={styles(color).innerHeaderContainer}
  />
);

CustomHeader.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
};

export default CustomHeader;
