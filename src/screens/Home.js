import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';
import CustomTabNavigator from '../components/CustomTabNavigator';


export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='home' type='font-awesome' color={tintColor} />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader navigation={this.props.navigation}/>
        <CustomTabNavigator />
      </View>
    );
  }
}

