import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { togglePrimaryColor } from '~/redux/actions';
import { PRIMARY_COLORS } from '~/util/constants';

import styles from './Decoding/styles';


class Decoding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
    togglePrimaryColor: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.props.togglePrimaryColor(PRIMARY_COLORS.BLUE.name);
    });
  }

  render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text> Decoding </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  togglePrimaryColor: color => dispatch(togglePrimaryColor(color)),
});

export default connect(null, mapDispatchToProps)(Decoding);
