import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';

export default class Encoding extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='home' type='font-awesome' color={tintColor} />
    ),
  };

  render() {
    return (
      <View>
        <CustomHeader navigation={this.props.navigation}/>
        <Text> Encoding </Text>
      </View>

    )
  }
}
