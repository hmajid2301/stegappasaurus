import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';
import colors from '../components/Common/colors';


export default class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name='settings' type='material-community' color={tintColor} />
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
        <CustomHeader navigation={this.props.navigation} color={colors.tertiaryColor}/>
        <Text> Settings </Text>
      </View>
    );
  }
}
