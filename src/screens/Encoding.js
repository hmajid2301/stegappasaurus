import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { toggleTheme } from '../actions';
import COLORS from '../themes';


class Encoding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    toggleTheme: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.props.toggleTheme(COLORS.secondary);
    });
  }

  render() {
    return (
      <View>
        <Text> Encoding </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleTheme: color => dispatch(toggleTheme(color)),
});

export default connect(null, mapDispatchToProps)(Encoding);
