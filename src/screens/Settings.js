import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import myColors from '../components/Common/styles';
import CustomHeader from '../components/CustomHeader';


export default class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name='settings' type='material-community' color={tintColor} />
    ),
  };

  render() {
    return (
      <View>
        <CustomHeader navigation={this.props.navigation}/>
        <Text> Settings </Text>
      </View>

    )
  }
}
