import PropTypes from 'prop-types';
import React from 'react';
import { Header, Icon } from 'react-native-elements';

import TextLogo from '../TextLogo';
import styles from './styles';


const MenuIcon = ({ navigation }) => (
  <Icon name='menu' type='simple-line-icon' color={styles.icons.color} onPress={() => navigation.openDrawer()}/>
);

MenuIcon.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const CustomerHeader = ({ navigation }) => (
  <Header
    leftComponent={MenuIcon({ navigation })}
    centerComponent={<TextLogo />}
    outerContainerStyles={styles.outerHeaderContainer}
    innerContainerStyles={styles.innerHeaderContainer}
  />
);

CustomerHeader.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CustomerHeader;
