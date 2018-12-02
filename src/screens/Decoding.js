import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { toggleTheme, changeTheme } from '../actions';
import COLORS from '../themes';


class Decoding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changeTheme: PropTypes.func.isRequired,
    toggleTheme: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (payload) => {
      const routeName = payload.state.key;
      this.props.changeTheme(routeName);
      this.props.toggleTheme(COLORS.primary);
    });
  }

  render() {
    return (
      <View>
        <Text> Decoding </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeTheme: route => dispatch(changeTheme(route)),
  toggleTheme: color => dispatch(toggleTheme(color)),
});

export default connect(null, mapDispatchToProps)(Decoding);
