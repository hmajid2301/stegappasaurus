import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import CustomHeader from '~/components/CustomHeader';

import CustomTabNavigator from './Home/CustomTabNavigator';
import styles from './Home/styles';


class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='home' type='FontAwesome' style={{ color: tintColor }}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
    primaryColor: PropTypes.string.isRequired,
  };

  static router = CustomTabNavigator.router;

  render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <CustomHeader
          color={this.props.primaryColor}
          navigation={this.props.navigation}
          theme={theme}
        />
        <CustomTabNavigator
          navigation={this.props.navigation}
          screenProps={{ theme }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  primaryColor: state.TogglePrimaryColor.colorData.color,
});

export default connect(mapStateToProps, null)(Home);
