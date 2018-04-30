import React from 'react';
import { Image, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import styles from './styles';

const logo = require('../../../assets/images/logo.png');

const leftComponent = () => (
  <Icon name='menu' type='simple-line-icon' color={styles.icons.color} />
);

const centerComponent = () => (
  <View style={styles.centerComponent}>
    <Text style={styles.headerText}>Steg</Text>
    <Text style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
    </Text>
    <Text style={styles.headerText}>ppasaurus</Text>
  </View>
);

const CustomHeader = () => (
  <Header
    leftComponent={leftComponent()}
    centerComponent={centerComponent()}
    outerContainerStyles={styles.outerHeaderContainer}
    innerContainerStyles={styles.innerHeaderContainer}
  />
);

export default CustomHeader;
