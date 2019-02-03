import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ImageMessage from '~/views/Home/ImageMessage';
import ImageProgressCircle from '~/views/Home/ImageProgressCircle';


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

  render() {
    const { theme } = this.props.screenProps;
    if (this.state.isEncoding) {
      return (
        <ImageProgressCircle photo={this.state.photo} theme={theme}/>
      );
    }
    return (
      <ImageMessage action={this.isEncoding} photo={this.state.photo}/>
    );
  }
}
