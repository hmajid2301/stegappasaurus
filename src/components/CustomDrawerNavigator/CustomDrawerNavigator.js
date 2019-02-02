import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { DrawerItems } from 'react-navigation';

import Logo from '../Logo';
import styles from './styles';
import { colors } from '../../util/styles';


const CustomDrawerNavigator = (props) => {
  const { theme } = props.screenProps;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: theme.backgroundColor }]}>
        <Logo theme={theme}/>
      </View>
      <DrawerItems
        activeBackgroundColor={colors.primary}
        activeTintColor={colors.pureWhite}
        iconContainerStyle={styles.icons}
        labelStyle={styles.text}
        inactiveTintColor={theme.color}
        {...props}
      />
    </View>
  );
};

CustomDrawerNavigator.propTypes = {
  screenProps: PropTypes.object.isRequired,
};


export default CustomDrawerNavigator;
