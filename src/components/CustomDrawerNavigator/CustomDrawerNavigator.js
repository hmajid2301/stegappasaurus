import React from 'react';
import { View } from 'react-native';
import { DrawerItems } from 'react-navigation';

import Logo from '../Logo';
import styles from './styles';


const CustomDrawerNavigator = props => (
    <View>
      <View style={styles.header}>
        <Logo/>
      </View>
      <DrawerItems {...props}/>
    </View>
);

export default CustomDrawerNavigator;
