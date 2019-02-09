import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Share, Text, View } from 'react-native';

import ImageMessage from '~/views/Home/ImageMessage';
import ImageProgressCircle from '~/views/Home/ImageProgressCircle';
import { colors } from '~/util/styles';


export default class EncodeImage extends Component {
  constructor(props) {
    const { navigation } = props;
    const uri = navigation.getParam('uri', 'NO-ID');

    super(props);
    this.state = {
      isEncoding: false,
      photo: uri,
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
  }

  isEncoding = () => {
    this.setState({ isEncoding: true });
  }

  encoded = () => {
    console.log('hello');
  }

  render() {
    const { theme } = this.props.screenProps;
    if (this.state.isEncoding) {
      return (
        <ImageProgressCircle
          action={this.encoded}
          photo={this.state.photo}
          primaryColor={colors.primary}
          theme={theme}
        />
      );
    }
    return (
      <ImageMessage action={this.isEncoding} photo={this.state.photo}/>
    );
  }
}
