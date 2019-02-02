import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';


const logo = require('../../assets/images/logo.png');


const Logo = ({ theme }) => (
  <View style={styles.container}>
    <Text style={[styles.text, { color: theme.color }]}>Steg</Text>
      <Image source={logo} style={styles.logo}/>
    <Text style={[styles.text, { color: theme.color }]}>ppasaurus</Text>
  </View>
);

Logo.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default Logo;
