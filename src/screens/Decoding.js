import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';

export default class Decoding extends Component {
  render() {
    return (
      <View>
        <CustomHeader navigation={this.props.navigation}/>
        <Text> Decoding </Text>
      </View>

    )
  }
}
