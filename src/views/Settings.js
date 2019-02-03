import {
  Icon,
  List,
} from 'native-base';
import { MailComposer } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

import CustomHeader from '~/components/CustomHeader';
import { colors } from '~/util/styles';

import { Algorithms, About, Support, Themes } from './Settings/sections';
import styles from './Settings/styles';


export default class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name='settings' type='Feather' style={{ color: tintColor }}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
  }

  sendEmail = () => {
    MailComposer.composeAsync({
      recipient: ['me@haseebmajid.com'],
      subject: 'Stegappasaurus',
    });
  }

  render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <CustomHeader
          color={colors.primary}
          navigation={this.props.navigation}
          theme={theme}
        />
        <List>
          <Algorithms theme={theme}/>
          <Themes theme={theme}/>
          <Support theme={theme}/>
          <About theme={theme}/>
        </List>
      </View>
    );
  }
}
