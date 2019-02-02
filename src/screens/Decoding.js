import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { changePrimaryColor } from '../actions';
import { PRIMARY_COLORS } from '../util/constants';


class Decoding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changePrimaryColor: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.props.changePrimaryColor(PRIMARY_COLORS.blue);
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text> Decoding </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changePrimaryColor: color => dispatch(changePrimaryColor(color)),
});

export default connect(null, mapDispatchToProps)(Decoding);
