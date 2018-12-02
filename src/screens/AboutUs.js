import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';
import colors from '../components/Common/colors';


export default class AboutUs extends Component {
  static navigationOptions = {
    drawerLabel: 'About Us',
    drawerIcon: ({ tintColor }) => (
      <Icon name='info' type='simple-line-icons' color={tintColor} />
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
        <CustomHeader navigation={this.props.navigation} color={colors.quaternaryColor}/>
        <Text> About Us </Text>
      </View>
    );
  }
}
