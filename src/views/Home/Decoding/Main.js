import { ImagePicker, Permissions } from 'expo';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { togglePrimaryColor } from '~/redux/actions';
import { PRIMARY_COLORS } from '~/util/constants';

import styles from './Main/styles';


class Decoding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      theme: PropTypes.shape({
        isDark: PropTypes.bool.isRequired,
        background: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    }),
    togglePrimaryColor: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.navigation.addListener('willFocus', () => {
      this.props.togglePrimaryColor(PRIMARY_COLORS.BLUE.name);
    });
  }

  getPhotoFromCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } else {
      throw new Error('Camera Roll permission not granted');
    }
  }

  selectPhotoToEncode = (uri) => {
    this.props.navigation.navigate('DecodeImage', { uri });
  }

  render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={this.getPhotoFromCameraRoll} style={styles.button}>
          <Icon name='photo' style={styles.icon} type='FontAwesome' />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  togglePrimaryColor: color => dispatch(togglePrimaryColor(color)),
});

export default connect(null, mapDispatchToProps)(Decoding);
