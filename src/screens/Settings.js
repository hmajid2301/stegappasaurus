import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';

import Header from '../components/Header';
import { colors } from '../util/styles';


export default class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: () => (
      <Icon name='settings' type='MaterialCommunityIcons'/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View>
        <Header color={colors.primary} navigation={this.props.navigation}/>
        <Text> Settings </Text>
      </View>
    );
  }
}
