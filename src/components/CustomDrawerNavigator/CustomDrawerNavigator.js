import React from 'react';
import { View } from 'react-native';
import { DrawerItems } from 'react-navigation';

import TextLogo from '../TextLogo';
import styles from './styles';


const CustomDrawerNavigator = props => (
    <View>
      <View style={styles.header}>
        <TextLogo />
      </View>
      <DrawerItems {...props} />
    </View>
);

export default CustomDrawerNavigator;
