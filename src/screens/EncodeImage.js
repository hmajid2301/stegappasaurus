import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';


const styles = StyleSheet.create({
});

export default class EncodeImage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('uri', 'NO-ID');

    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri }} resizeMode={'contain'} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }} />
      </View>
    );
  }
}
