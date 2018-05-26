import PropTypes from 'prop-types';
import React from 'react';
import { Header, Icon } from 'react-native-elements';

import TextLogo from '../TextLogo';
import styles from './styles';

const leftComponent = ({ navigation }) => (
  <Icon name='menu' type='simple-line-icon' color={styles.icons.color} onPress={() => navigation.openDrawer()}/>
);

const CustomHeader = ({ navigation }) => (
  <Header
    leftComponent={leftComponent({ navigation })}
    centerComponent={<TextLogo />}
    outerContainerStyles={styles.outerHeaderContainer}
    innerContainerStyles={styles.innerHeaderContainer}
  />
);

leftComponent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

CustomHeader.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CustomHeader;
