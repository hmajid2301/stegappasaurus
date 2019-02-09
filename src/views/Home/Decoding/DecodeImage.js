import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ImageMessage from '~/views/Home/ImageMessage';
import ImageProgressCircle from '~/views/Home/ImageProgressCircle';
import { colors } from '~/util/styles';


export default class DecodeImage extends Component {
  constructor(props) {
    const { navigation } = props;
    const uri = navigation.getParam('uri', 'NO-ID');

    super(props);
    this.state = {
      isDecoded: false,
      photo: uri,
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
  }

  decoded = () => {
    this.setState({ isDecoded: true });
  }

  render() {
    const { theme } = this.props.screenProps;

    if (this.state.isDecoded) {
      return (
      <ImageMessage message={'Temp'} photo={this.state.photo}/>
      );
    }

    return (
      <ImageProgressCircle
        action={this.decoded}
        photo={this.state.photo}
        primaryColor={colors.secondary}
        theme={theme}
      />
    );
  }
}
