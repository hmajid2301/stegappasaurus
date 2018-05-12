import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';

export default class AboutUs extends Component {
  static navigationOptions = {
    drawerLabel: 'About Us',
    drawerIcon: ({ tintColor }) => (
      <Icon name='info' type='simple-line-icons' color={tintColor} />
    ),
  };

  render() {
    return (
      <View>
        <CustomHeader navigation={this.props.navigation}/>
        <Text> About Us </Text>
      </View>
    )
  }
}
