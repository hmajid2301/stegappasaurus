import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomHeader from '../components/CustomHeader';
import CustomTabNavigator from '../components/CustomTabNavigator';


class Home extends Component {
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
    color: PropTypes.shape({
      hexCode: PropTypes.string,
    }).isRequired,
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader navigation={this.props.navigation} color={this.props.color.hexCode} />
        <CustomTabNavigator />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  color: state.ToggleTheme.colorData,
});

export default connect(mapStateToProps, null)(Home);
