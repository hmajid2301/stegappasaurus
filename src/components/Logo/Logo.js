import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';


const logoDark = require('~/assets/images/logo-dark.png');
const logoLight = require('~/assets/images/logo-light.png');


const Logo = ({ color, isDark }) => (
  <View style={styles.container}>
    <Text style={[styles.text, { color }]}>Steg</Text>
    <Image source={isDark ? logoLight : logoDark} style={styles.logo} />
    <Text style={[styles.text, { color }]}>ppasaurus</Text>
  </View>
);

Logo.propTypes = {
  color: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default Logo;
