import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { DrawerItems } from 'react-navigation';

import Logo from '~/components/Logo';
import { colors } from '~/util/styles';
import styles from './styles';


const CustomDrawerNavigator = (props) => {
  const { theme } = props.screenProps;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Logo color={theme.color} isDark={theme.isDark}/>
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
