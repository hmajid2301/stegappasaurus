import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';


const logo = require('../../../assets/images/logo.png');

const TextLogo = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Steg</Text>
    <Text style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
    </Text>
    <Text style={styles.text}>ppasaurus</Text>
  </View>
);


export default TextLogo;
