import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Header from '../components/Header';
import { colors } from '../util/styles';


export default class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name='settings' type='material-community' color={tintColor}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <View>
        <Header navigation={this.props.navigation} color={colors.primary}/>
        <Text> Settings </Text>
      </View>
    );
  }
}
