import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';


export default class Licenses extends Component {
  static navigationOptions = {
    drawerLabel: 'Licenses',
    drawerIcon: ({ tintColor }) => (
      <Icon name='copyright' type='material-community' color={tintColor} />
    ),
  };

  render() {
    return (
      <View>
        <CustomHeader navigation={this.props.navigation}/>
        <Text> Licenses </Text>
      </View>

    )
  }
}
