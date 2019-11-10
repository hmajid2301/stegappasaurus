import * as React from 'react';
import {Image, Text, View} from 'react-native';

import logoDark from '~/assets/images/logo-dark.png';
import logoLight from '~/assets/images/logo-light.png';
import {ThemeColors} from '~/constants/types';
import styles from './styles';

interface IProps {
  isDark: boolean;
  color: ThemeColors;
}

const Logo = ({color, isDark}: IProps) => (
  <View style={styles.logoContainer}>
    <Text style={[styles.text, {color}]}>Steg</Text>
    <Image source={isDark ? logoLight : logoDark} style={styles.logo} />
    <Text style={[styles.text, {color}]}>ppasaurus</Text>
  </View>
);

export default Logo;
